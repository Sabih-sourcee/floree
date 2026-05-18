import requests
import os

def process_with_gemini(page, source_img, ref_img, prompt, negative_prompt):
    # 1. Navigate to Gemini
    page.goto("https://gemini.google.com/app")

    # 2. Upload images (handling the file input)
    # Note: Target the upload button and use set_input_files
    page.get_by_label("Upload image").set_input_files([source_img, ref_img])

    # 3. Enter prompt + negative prompt
    full_prompt = f"{prompt}\n\nNegative Prompt:\n{negative_prompt}"
    page.get_by_role("textbox").fill(full_prompt)
    page.keyboard.press("Enter")

    # 4. Wait for generation and extract image
    # Look for the most recent generated image element
    page.wait_for_selector("img.generated-image") # Simplified selector
    img_element = page.locator("img.generated-image").last
    img_url = img_element.get_attribute("src")
    return img_url

def download_image(url, save_path):
    response = requests.get(url, stream=True)
    with open(save_path, 'wb') as f:
        f.write(response.content)
