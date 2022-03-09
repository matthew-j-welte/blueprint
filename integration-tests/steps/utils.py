import requests
from http import HTTPStatus
from typing import Tuple

from requests.api import request


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


def register(uri, data):
    return requests.post(
        uri + "/MemberAccount/register",
        json=data,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def submit_exercise_submission(uri, data):
    return requests.post(
        uri + "/Exercise/new-submission",
        json=data,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def get_exercise(uri: str, exercise_id: str):
    return requests.get(
        uri + "/Exercise/exercise-details/" + exercise_id,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def get_exercise_submission_previews(uri):
    return requests.get(
        uri + "/Exercise/exercise-submission-previews",
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def get_exercise_cards(uri):
    return requests.get(
        uri + "/Exercise/exercise-cards",
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def approve_exercise_submission(uri, data):
    return requests.put(
        uri + "/Exercise/exercise-approval",
        json=data,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def start_exercise_review(uri: str, exercise_id: str):
    return requests.get(
        uri + "/Exercise/start-exercise-submission-review/" + exercise_id,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def submit_challenge_template(uri, data):
    return requests.post(
        uri + "/ChallengeTemplate/post-global-template-submission",
        json=data,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def get_challenge_template(uri: str, challenge_template_Id: str):
    return requests.get(
        uri + "/ChallengeTemplate/get-challenge-template/" + challenge_template_Id,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def get_challenge_template_submission_previews(uri):
    return requests.get(
        uri + "/ChallengeTemplate/get-global-challenge-template-submissions",
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def get_global_challenge_template_cards(uri):
    return requests.get(
        uri + "/ChallengeTemplate/get-global-challenge-template-cards",
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def approve_challenge_template_submission(uri, data):
    return requests.put(
        uri + "/ChallengeTemplate/approve-template-submission",
        json=data,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def start_challenge_template_review(uri: str, challenge_template_id: str):
    return requests.get(
        uri
        + "/ChallengeTemplate/start-challenge-template-review/"
        + challenge_template_id,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def post_new_challenge(uri, data):
    return requests.post(
        uri + "/Challenge/new-challenge",
        json=data,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def post_challenge_statistic(uri, data):
    return requests.post(
        uri + "/Challenge/post-statistic",
        json=data,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def get_leaderboard(uri, challengeId):
    return requests.get(
        uri + "/Challenge/get-challenge-dashboard/" + challengeId,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )


def complete_challenge(uri, challengeId):
    return requests.get(
        uri + "/Challenge/complete-challenge/" + challengeId,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )