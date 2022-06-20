import requests
from http import HTTPStatus
from typing import Tuple
from requests.api import request
from helpers import routes
from helpers import api_client


def validate_200_status(response: requests.Response):
    if response is None:
        assert False, "Response returned None"
    assert response.status_code == HTTPStatus.OK, (
        "Response from "
        + response.url
        + " returned status: "
        + str(response.status_code)
        + " with details: "
        + str(response.content)
    )


def is_app_running(uri: str) -> Tuple[bool, requests.Response]:
    try:
        res = requests.get(uri)
    except:
        return False, None
    return (res.status_code == HTTPStatus.OK, res)


def get_exercise_by_name(name: str):
    res = requests.get(routes.getAllExerciseLinks + "0")
    exercises = res.json()
    exerciseId = next(x for x in exercises if x["exerciseName"] == name)["exerciseId"]
    print(exerciseId)
    res = api_client.get_exercise(exerciseId)
    return res.json()