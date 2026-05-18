import logging
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from playwright.sync_api import Page

logging.basicConfig(level=logging.INFO)


def remove_watermark(page: 'Page', image_path: str, output_path: str) -> None:
    """
    Uploads an image to reel.money, removes its watermark, and saves the result.

    Uses state-based waiting instead of fixed sleeps: waits for the Download
    button to appear, then intercepts the browser download event to save the
    file directly to output_path — no system dialog required.

    Args:
        page: The Playwright page object.
        image_path: Absolute path to the image that needs watermark removal.
        output_path: Absolute path where the cleaned image should be saved.

    Raises:
        TimeoutError: If the Download button does not appear within 90 seconds.
        Exception: If the file upload or download step fails.
    """
    logging.info(f"Navigating to reel.money for: {image_path}")
    page.goto("https://reel.money/video-watermark-remover/")

    # Upload the watermarked image via the file input
    try:
        file_input = page.locator("input[type='file']").first
        file_input.set_input_files(image_path)
        logging.info("File uploaded successfully.")
    except Exception as e:
        raise Exception(f"Failed to upload file to reel.money: {e}")

    # Click "Remove Watermark" button
    try:
        remove_btn = page.get_by_role("button", name="Remove Watermark", exact=False)
        remove_btn.first.click()
        logging.info("Clicked 'Remove Watermark'. Waiting for processing...")
    except Exception as e:
        raise Exception(f"Failed to click Remove Watermark button: {e}")

    # State-based wait: wait for the Download button to appear (up to 90s)
    try:
        page.wait_for_selector(
            "button:has-text('Download'), a:has-text('Download')",
            timeout=90_000
        )
        logging.info("Processing complete. Download button appeared.")
    except Exception:
        raise TimeoutError(
            "Watermark removal timed out after 90 seconds. "
            "The site may be slow or the selector needs updating."
        )

    # Intercept the download event and save directly to output_path
    try:
        with page.expect_download(timeout=30_000) as download_info:
            download_btn = page.locator(
                "button:has-text('Download'), a:has-text('Download')"
            ).first
            download_btn.click()

        download = download_info.value
        download.save_as(output_path)
        logging.info(f"Saved cleaned image to: {output_path}")
    except Exception as e:
        raise Exception(f"Failed to download cleaned image: {e}")
