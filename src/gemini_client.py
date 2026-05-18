import requests
import os
import shutil
import logging
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from playwright.sync_api import Page

logging.basicConfig(level=logging.INFO)

def process_with_gemini(page: 'Page', source_img: str, ref_img: str, prompt: str, negative_prompt: str) -> str:
    """
    Processes an image generation request using the Gemini AI interface.

    Args:
        page: The Playwright page object.
        source_img: Path to the source image.
        ref_img: Path to the reference image.
        prompt: The generation prompt.
        negative_prompt: The negative prompt to exclude certain elements.

    Returns:
        The URL of the generated image.
    """
    # 1. Navigate to Gemini
    page.goto("https://gemini.google.com/app")

    # 2. Upload images (handling the file input)
    # Note: Target the upload button and use set_input_files
    page.get_by_label("Upload image").set_input_files([source_img, ref_img])

    # 3. Enter prompt + negative prompt
    full_prompt = f"{prompt}\n\nNegative Prompt:\n{negative_prompt}"
    # Using a more specific placeholder selector for the prompt area
    page.get_by_placeholder("Enter a prompt here").fill(full_prompt)
    page.keyboard.press("Enter")

    # 4. Wait for generation and extract image
    # Use a robust selector combining aria-label and potential src patterns for generated images
    image_selector = 'img[aria-label*="generated"], img[src*="googleusercontent.com/lm"]'
    page.wait_for_selector(image_selector)
    img_element = page.locator(image_selector).last
    img_url = img_element.get_attribute("src")
    return img_url

def download_image(url: str, save_path: str) -> None:
    """
    Downloads an image from a URL and saves it to the specified path.

    Args:
        url: The URL of the image to download.
        save_path: The local path where the image should be saved.

    Raises:
        requests.exceptions.RequestException: If the download fails.
    """
    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            shutil.copyfileobj(response.raw, f)
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to download image from {url}: {e}")
        raise
