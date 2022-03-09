import os
import shutil
import time

DEVELOPMENT = "dev"

DEV_CONFIG = {
    "uris": {
        "ChallengeTracker": "http://localhost:5000",
        "ExerciseTracker": "http://localhost:5001",
        "MemberTracker": "http://localhost:5002",
        "MilestoneTracker": "http://localhost:5003",
    }
}

ENV_MAP = {"dev": DEV_CONFIG}


class BehaveArgumentError(Exception):
    pass


def before_all(context):
    sentrain_path = os.getenv("SENTRAIN_PATH", None)
    if sentrain_path is None:
        raise EnvironmentError(
            "Must set SENTRAIN_PATH environment variable. It should be the path of your Sentrain git repo"
        )
    env = context.config.userdata.get("env", "dev")

    if env is None:
        raise BehaveArgumentError(
            "Must pass in env (dev for development environment) in the form behave -D env=<env>"
        )
    speed = context.config.userdata.get("speed", "slow")
    context.config.retain = context.config.userdata.get("retain", "no")

    context.config.st_config = ENV_MAP[env]
    context.config.speed = speed


def before_scenario(context, scenario):
    if context.config.speed == "slow":
        time.sleep(0.15)


def before_step(context, step):
    if context.config.speed == "slow":
        time.sleep(0.15)


def after_all(context):
    sentrain_path = os.getenv("SENTRAIN_PATH", None)
    if sentrain_path is None:
        raise EnvironmentError(
            "Must set SENTRAIN_PATH environment variable. It should be the path of your Sentrain git repo"
        )

    if context.config.retain != "yes":
        integration_db_path = os.path.join(sentrain_path, "local-db", "integration")
        if os.path.exists(integration_db_path):
            shutil.rmtree(integration_db_path)
