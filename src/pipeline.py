import os
import glob
import json
import logging

from src.browser_manager import get_browser_context, close_browser
from src.gemini_client import process_with_gemini, download_image
from src.watermark_client import remove_watermark

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

IMAGE_EXTENSIONS = ("*.jpg", "*.jpeg", "*.png", "*.webp", "*.bmp")


def _discover_images(folder: str) -> list[str]:
    files: list[str] = []
    for ext in IMAGE_EXTENSIONS:
        files.extend(glob.glob(os.path.join(folder, ext)))
        files.extend(glob.glob(os.path.join(folder, ext.upper())))
    return sorted(set(files))


def run_pipeline(config_path: str = "config.json") -> None:
    """
    Main pipeline: discovers product images, processes each through Gemini
    (background replacement + ratio change), removes the Gemini watermark via
    reel.money, then saves the final image to the output folder.

    Args:
        config_path: Path to config.json. Defaults to "config.json".
    """
    with open(config_path, encoding="utf-8") as f:
        config = json.load(f)

    paths = config["paths"]
    gemini_cfg = config["gemini"]

    os.makedirs(paths["temp_cache"], exist_ok=True)
    os.makedirs(paths["output_folder"], exist_ok=True)

    source_files = _discover_images(paths["source_folder"])
    if not source_files:
        logging.warning(f"No images found in: {paths['source_folder']}")
        return

    logging.info(f"Found {len(source_files)} image(s) to process.")

    pw, context = get_browser_context(config_path)
    page = context.new_page()

    processed, failed = 0, 0

    for idx, file_path in enumerate(source_files):
        base_name = os.path.basename(file_path)
        logging.info(f"[{idx + 1}/{len(source_files)}] Processing: {base_name}")

        temp_path = os.path.join(paths["temp_cache"], f"temp_{idx}_{base_name}")
        final_path = os.path.join(paths["output_folder"], f"cleaned_{base_name}")

        try:
            # Step 1: Gemini — upload images + prompt → get generated image URL
            img_url = process_with_gemini(
                page=page,
                source_img=file_path,
                ref_img=paths["reference_image"],
                prompt=gemini_cfg["prompt"],
                negative_prompt=gemini_cfg["negative_prompt"],
            )

            # Step 2: Download the Gemini result to temp cache
            download_image(url=img_url, save_path=temp_path)
            logging.info(f"Gemini output cached at: {temp_path}")

            # Step 3: Remove watermark via reel.money → save to output folder
            remove_watermark(page=page, image_path=temp_path, output_path=final_path)
            logging.info(f"Final image saved: {final_path}")

            processed += 1

        except Exception as e:
            logging.error(f"Failed on {base_name}: {e}")
            failed += 1
            continue

        finally:
            # Clean up temp file whether or not the step succeeded
            if os.path.exists(temp_path):
                os.remove(temp_path)

    close_browser(pw, context)
    logging.info(
        f"Pipeline complete. Processed: {processed}, Failed: {failed}, "
        f"Total: {len(source_files)}"
    )


if __name__ == "__main__":
    run_pipeline()
