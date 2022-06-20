import os
import shutil
import time
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver


DEVELOPMENT = "dev"

DEV_CONFIG = {
    "ExerciseTracker": "http://localhost:5001",
    "WorkoutTracker": "http://localhost:5002",
}

ENV_MAP = {"dev": DEV_CONFIG}

MISSIN_ENV_PROMPT = (
    "Must set BLUEPRINT_GYM_PATH environment variable. The path should be <blueprint git repo>/apps/blueprint-gym"
)
MISSIN_CHROMIUM_PROMPT = (
    "Must set CHROMIUM_PATH environment variable. The path should be a link to the executable to a chromium-driver"
)


class BehaveArgumentError(Exception):
    pass


class E2EConfig:
    def __init__(self, **kwargs) -> None:
        self.browser: WebDriver = kwargs.get("browser")
        self.speed = kwargs.get("speed")


def before_all(context):
    blueprint_gym_path = os.getenv("BLUEPRINT_GYM_PATH", None)
    chromium_path = os.getenv("CHROMIUM_PATH", None)
    if blueprint_gym_path is None:
        raise EnvironmentError(MISSIN_ENV_PROMPT)
    if chromium_path is None:
        raise EnvironmentError(MISSIN_CHROMIUM_PROMPT)
    env = context.config.userdata.get("env", "dev")

    if env is None:
        raise BehaveArgumentError("Must pass in env (dev for development environment) in the form behave -D env=<env>")
    speed = context.config.userdata.get("speed", "slow")
    context.config.retain = context.config.userdata.get("retain", "no")
    context.config.sleep_on_failure = context.config.userdata.get("sleep_on_failure", "no")

    context.config.url_lookups = ENV_MAP[env]
    context.config.e2econfig = E2EConfig(browser=webdriver.Chrome(chromium_path), speed=speed)


def before_scenario(context, scenario):
    if context.config.e2econfig.speed == "slow":
        time.sleep(0.15)


def after_scenario(context, scenario):
    if context.failed and context.config.sleep_on_failure == "yes":
        time.sleep(60 * 60)


def before_step(context, step):
    if context.config.e2econfig.speed == "slow":
        time.sleep(0.15)


def after_all(context):
    blueprint_gym_path = os.getenv("BLUEPRINT_GYM_PATH", None)
    if blueprint_gym_path is None:
        raise EnvironmentError(MISSIN_ENV_PROMPT)

    if context.config.retain != "yes":
        integration_db_path = os.path.join(blueprint_gym_path, "local-db", "local-e2e")
        if os.path.exists(integration_db_path):
            shutil.rmtree(integration_db_path)

    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.quit()
