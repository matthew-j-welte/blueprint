from helpers import routes as api_routes
import requests


def get_exercise(exerciseId: str):
    return requests.get(api_routes.getExercise + exerciseId)


def add_new_exercise(exercise: dict) -> requests.Response:
    return requests.post(api_routes.postNewExercise, json=exercise)


def pre_publish_exercise(exercise: dict) -> requests.Response:
    return requests.put(api_routes.prePublish, json=exercise)


def get_admin_publish_requests(userId: str) -> requests.Response:
    return requests.get(api_routes.adminGetPublishRequests + userId)


def get_my_publish_requests(userId: str) -> requests.Response:
    return requests.get(api_routes.getMyPublishRequests + userId)
