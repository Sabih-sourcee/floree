from playwright.sync_api import sync_playwright, Playwright, BrowserContext
import json
from typing import Tuple

def get_browser_context(config_path: str = "config.json") -> Tuple[Playwright, BrowserContext]:
    """
    Initializes a Playwright browser context using a persistent profile.

    Args:
        config_path (str): Path to the JSON configuration file. Defaults to "config.json".

    Returns:
        Tuple[Playwright, BrowserContext]: A tuple containing the Playwright instance and the browser context.

    Raises:
        FileNotFoundError: If the config file is not found.
        json.JSONDecodeError: If the config file is not valid JSON.
        KeyError: If required keys are missing from the config file.
        RuntimeError: If the browser fails to launch.
    """
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Configuration file not found at: {config_path}")
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(f"Failed to parse config JSON: {e.msg}", e.doc, e.pos)

    try:
        profile_path = config["paths"]["chrome_profile_path"]
    except KeyError:
        raise KeyError("Configuration missing required key: 'paths' -> 'chrome_profile_path'")

    try:
        pw = sync_playwright().start()
        # Use launch_persistent_context to maintain login sessions
        context = pw.chromium.launch_persistent_context(
            user_data_dir=profile_path,
            headless=False  # Must be False to see if login is needed
        )
        return pw, context
    except Exception as e:
        # If we fail here, we should try to stop playwright if it was started
        if 'pw' in locals():
            pw.stop()
        raise RuntimeError(f"Failed to launch browser context: {e}")

def close_browser(pw: Playwright, context: BrowserContext) -> None:
    """
    Closes the browser context and stops the Playwright instance.

    Args:
        pw (Playwright): The Playwright instance to stop.
        context (BrowserContext): The browser context to close.
    """
    try:
        context.close()
    except Exception as e:
        print(f"Error closing browser context: {e}")
    finally:
        try:
            pw.stop()
        except Exception as e:
            print(f"Error stopping Playwright: {e}")
