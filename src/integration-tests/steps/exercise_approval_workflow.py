from behave import given, when, then
import utils as st_utils
import time
from http import HTTPStatus

sample_exercise_submission = {
    "name": "Integration Test Exercise",
    "description": "This is a test exercise used by Integration Tests",
    "author": None,
    "category": 0,
    "instructionVideoUrl": "exercise::default-instruction.mov",
    "difficulty": 0,
    "injuryRisks": "DRAFT STATE\nNone",
    "similarExercises": [
        {
            "exerciseId": "f4bb0cd4-0536-4806-85a1-02032b9cd500",
            "exerciseName": "Push Up",
            "exerciseCategory": 0,
            "exerciseDifficulty": 1,
            "exerciseIconUrl": "pushup-easy.png",
            "repVisionEnabled": False,
            "createdOn": None,
        },
        {
            "exerciseId": "012ece5b-71ee-482d-a538-a9f19c5cc090",
            "exerciseName": "Sit Up",
            "exerciseCategory": 2,
            "exerciseDifficulty": 0,
            "exerciseIconUrl": "sit-up.png",
            "repVisionEnabled": False,
            "createdOn": None,
        },
    ],
    "exerciseMilestones": [],
    "modifiedOn": "0001-01-01T00:00:00.0000000+00:00",
}


@given(u"A user submits a new Exercise with all data filled out")
def step_impl(context):
    res = st_utils.submit_exercise_submission(
        context.app_uri, sample_exercise_submission
    )
    st_utils.validate_200_status(res)
    context.upserted_exercise_id = res.json()["exerciseId"]


@given(u"An exercise submission reference is stored in the DB")
def step_impl(context):
    res = st_utils.get_exercise_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    previews: list = res.json()
    assert any(
        x["exerciseId"] == context.upserted_exercise_id for x in previews
    ), "The exercise submission was not found"


@given(u"An exercise record is stored in the DB")
def step_impl(context):
    res = st_utils.get_exercise(context.app_uri, context.upserted_exercise_id)
    st_utils.validate_200_status(res)

    exercise = res.json()
    assert (
        exercise["exerciseId"] == context.upserted_exercise_id
    ), "The exercise was not found"


@given(u"There is no exercise card available")
def step_impl(context):
    res = st_utils.get_exercise_cards(context.app_uri)
    st_utils.validate_200_status(res)

    cards: list = res.json()
    assert not any(
        x["exerciseId"] == context.upserted_exercise_id for x in cards
    ), "There was an exercise card found for this exercise"


@when(u"A Sentrain admin approves the exercise")
def step_impl(context):
    exercise = st_utils.get_exercise(
        context.app_uri, context.upserted_exercise_id
    ).json()
    res = st_utils.approve_exercise_submission(context.app_uri, exercise)
    st_utils.validate_200_status(res)
    context.approved_upserted_exercise = res.json()


@then(u"The submission reference is no longer returned from the submissions query")
def step_impl(context):
    res = st_utils.get_exercise_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    previews: list = res.json()
    assert not any(
        x["exerciseId"] == context.upserted_exercise_id for x in previews
    ), "The exercise submission is still present"


@then(u"An exercise card is made available")
def step_impl(context):
    res = st_utils.get_exercise_cards(context.app_uri)
    st_utils.validate_200_status(res)

    cards: list = res.json()
    assert any(
        x["exerciseId"] == context.upserted_exercise_id for x in cards
    ), "There was not an exercise card found for this exercise"


@then(
    u"The returned exercise model retains all expected data of the initial submission"
)
def step_impl(context):
    res = st_utils.get_exercise(context.app_uri, context.upserted_exercise_id)
    st_utils.validate_200_status(res)

    fieldsThatShouldBeEqual = [
        "name",
        "description",
        "author",
        "category",
        "instructionVideoUrl",
        "difficulty",
        "similarExercises",
    ]

    exercise = res.json()
    assert all(
        [
            exercise[fieldName] == sample_exercise_submission[fieldName]
            for fieldName in fieldsThatShouldBeEqual
        ]
    )
    assert (
        len(exercise["injuryRisks"]) == 1
    ), "Injury risks has a mismatch, expected 1 got 0"


@then(u"The returned exercise card has consitent data with the exercise entity")
def step_impl(context):
    res = st_utils.get_exercise_cards(context.app_uri)
    st_utils.validate_200_status(res)

    cards: list = res.json()
    card = next(
        (x for x in cards if x["exerciseId"] == context.upserted_exercise_id), None
    )
    assert card is not None, "No Card found for this exercise"

    res = st_utils.get_exercise(context.app_uri, context.upserted_exercise_id)
    exercise = res.json()

    fieldMatchList = [
        ("name", "exerciseName"),
        ("category", "exerciseCategory"),
        ("difficulty", "exerciseDifficulty"),
        ("iconUrl", "exerciseIconUrl"),
        ("repVisionEnabled", "repVisionEnabled"),
        ("createdOn", "createdOn"),
    ]

    assert all(
        card[cardKey] == exercise[exerciseKey]
        for exerciseKey, cardKey in fieldMatchList
    ), "Not all fields match between the exercise entity and exercise card"


@when(u"A Sentrain admin Approves the exercise with modifications")
def step_impl(context):
    exercise = st_utils.get_exercise(
        context.app_uri, context.upserted_exercise_id
    ).json()

    exercise["name"] = "New Name"
    exercise["difficulty"] = 1
    exercise["description"] = exercise["description"] + "\nSome more details here"

    context.modified_exercise_before_approval = exercise
    res = st_utils.approve_exercise_submission(context.app_uri, exercise)
    st_utils.validate_200_status(res)
    context.approved_upserted_exercise = res.json()


@then(u"Those changes are reflected in the Exercise entity")
def step_impl(context):
    res = st_utils.get_exercise(context.app_uri, context.upserted_exercise_id)
    st_utils.validate_200_status(res)

    fieldsThatShouldBeEqual = [
        "name",
        "description",
        "author",
        "category",
        "instructionVideoUrl",
        "difficulty",
        "similarExercises",
    ]

    exercise = res.json()
    assert all(
        [
            exercise[fieldName] == context.modified_exercise_before_approval[fieldName]
            for fieldName in fieldsThatShouldBeEqual
        ]
    )
    assert (
        len(exercise["injuryRisks"]) == 1
    ), "Injury risks has a mismatch, expected 1 got 0"


@given(u"Approver A loads the exercise submission references")
def step_impl(context):
    res = st_utils.get_exercise_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    context.approver_a_previews = res.json()


@given(u"Approver B loads the exercise submission references")
@given(u"Approver B loads the same exercise submission references")
def step_impl(context):
    res = st_utils.get_exercise_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    context.approver_b_previews = res.json()


@given(u"Approver A begins reviewing the exercise submission")
def step_impl(context):
    res = st_utils.start_exercise_review(context.app_uri, context.upserted_exercise_id)

    st_utils.validate_200_status(res)
    exercise = res.json()
    assert exercise["exerciseId"] == context.upserted_exercise_id


@when(
    u"Approver B attempts to begin a review of the same exercise submission approver A began reviewing"
)
@when(
    u"Approver B attempts to begin a review of the same exercise submission approver A is currently reviewing"
)
def step_impl(context):
    res = st_utils.start_exercise_review(context.app_uri, context.upserted_exercise_id)
    context.approver_b_start_exercise_review_response = res


@then(u"Approver B is notified this exercise submission is locked")
def step_impl(context):
    assert (
        context.approver_b_start_exercise_review_response.status_code
        == HTTPStatus.NO_CONTENT
    )


@given(u"Approver A closes the webpage forcefully")
def step_impl(context):
    # TODO: Is there anything else to do here?
    pass


@given(u"1 hour passes")
def step_impl(context):
    time.sleep(5)


@then(u"Approver B receives the exercise detais and is able to review")
def step_impl(context):
    assert (
        context.approver_b_start_exercise_review_response.status_code == HTTPStatus.OK
    )


@then(u"Approval of the exercise by Approver B is successful")
def step_impl(context):
    exercise = st_utils.get_exercise(
        context.app_uri, context.upserted_exercise_id
    ).json()
    res = st_utils.approve_exercise_submission(context.app_uri, exercise)
    st_utils.validate_200_status(res)
