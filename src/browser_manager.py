from playwright.sync_api import sync_playwright
import json

def get_browser_context(config_path="config.json"):
    with open(config_path) as f:
        config = json.load(f)

    pw = sync_playwright().start()
    # Use launch_persistent_context to maintain login sessions
    context = pw.chromium.launch_persistent_context(
        user_data_dir=config["paths"]["chrome_profile_path"],
        headless=False # Must be False to see if login is needed
    )
    return pw, context

def close_browser(pw, context):
    context.close()
    pw.stop()
