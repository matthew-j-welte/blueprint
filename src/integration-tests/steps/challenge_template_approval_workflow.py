from behave import given, when, then
import utils as st_utils
import time
from http import HTTPStatus

sample_challenge_template_submission = {
    "templateName": "Integration Test Template",
    "offDays": 5,
    "maxWorkoutMinutesPerDay": 120,
    "maxWorkoutSessionsPerDay": 2,
    "challengeType": 0,
    "difficulty": 1,
}


@given(u"A challenge template submission reference is stored in the DB")
def step_impl(context):
    res = st_utils.get_challenge_template_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    previews: list = res.json()
    assert any(
        x["challengeTemplateId"] == context.upserted_challenge_template_id
        for x in previews
    ), "The challenge submission was not found"


@then(
    u"The challenge template submission reference is no longer returned from the submissions query"
)
def step_impl(context):
    res = st_utils.get_challenge_template_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    previews: list = res.json()
    assert not any(
        x["challengeTemplateId"] == context.upserted_challenge_template_id
        for x in previews
    ), "The challenge submission is still present"


@given(u"Approver A loads the same challenge template submission references")
@given(u"Approver A loads the challenge template submission references")
def step_impl(context):
    res = st_utils.get_challenge_template_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    context.approver_a_previews = res.json()


@given(u"Approver B loads the challenge template submission references")
@given(u"Approver B loads the same challenge template submission references")
def step_impl(context):
    res = st_utils.get_challenge_template_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    context.approver_b_previews = res.json()


@given(u"Approver A begins reviewing the challenge template submission")
def step_impl(context):
    res = st_utils.start_challenge_template_review(
        context.app_uri, context.upserted_challenge_template_id
    )

    st_utils.validate_200_status(res)
    challenge_template = res.json()
    assert (
        challenge_template["challengeTemplateId"]
        == context.upserted_challenge_template_id
    )


@when(
    u"Approver B attempts to begin a review of the same challenge template submission approver A began reviewing"
)
@when(
    u"Approver B attempts to begin a review of the same challenge template submission approver A is currently reviewing"
)
def step_impl(context):
    res = st_utils.start_challenge_template_review(
        context.app_uri, context.upserted_challenge_template_id
    )

    context.approver_b_start_challenge_template_review_response = res


@then(u"Approver B is notified this challenge template submission is locked")
def step_impl(context):
    print(context.approver_b_start_challenge_template_review_response.status_code)
    print(str(context.approver_b_start_challenge_template_review_response))
    assert (
        context.approver_b_start_challenge_template_review_response.status_code
        == HTTPStatus.NO_CONTENT
    )


@given(u"A user submits a new challenge template with all data filled out")
def step_impl(context):
    raise NotImplementedError(
        u"STEP: Given A user submits a new challenge template with all data filled out"
    )


@given(u"A user submits a new global challenge template")
def step_impl(context):
    res = st_utils.submit_challenge_template(
        context.app_uri, sample_challenge_template_submission
    )
    st_utils.validate_200_status(res)
    context.upserted_challenge_template_id = res.json()["challengeTemplateId"]


@given(u"A challenge template record is stored in the DB")
def step_impl(context):
    res = st_utils.get_challenge_template(
        context.app_uri, context.upserted_challenge_template_id
    )
    st_utils.validate_200_status(res)

    challenge = res.json()
    assert (
        challenge["challengeTemplateId"] == context.upserted_challenge_template_id
    ), "The challenge was not found"


@given(u"There is no challenge template card available")
def step_impl(context):
    res = st_utils.get_global_challenge_template_cards(context.app_uri)
    st_utils.validate_200_status(res)

    cards: list = res.json()
    assert not any(
        x["challengeTemplateId"] == context.upserted_challenge_template_id
        for x in cards
    ), "There was an challenge card found for this challenge"


@when(u"A Sentrain admin approves the challenge template")
def step_impl(context):
    challenge = st_utils.get_challenge_template(
        context.app_uri, context.upserted_challenge_template_id
    ).json()
    res = st_utils.approve_challenge_template_submission(context.app_uri, challenge)
    st_utils.validate_200_status(res)
    context.approved_upserted_challenge = res.json()


@then(u"A global challenge template card is made available")
def step_impl(context):
    res = st_utils.get_global_challenge_template_cards(context.app_uri)
    st_utils.validate_200_status(res)

    cards: list = res.json()
    assert any(
        x["challengeTemplateId"] == context.upserted_challenge_template_id
        for x in cards
    ), "There was not an challenge card found for this challenge"


@then(
    u"The returned challenge template model retains all expected data of the initial submission"
)
def step_impl(context):
    res = st_utils.get_challenge_template(
        context.app_uri, context.upserted_challenge_template_id
    )
    st_utils.validate_200_status(res)

    fieldsThatShouldBeEqual = [
        "templateName",
        "offDays",
        "maxWorkoutMinutesPerDay",
        "maxWorkoutSessionsPerDay",
        "challengeType",
        "difficulty",
    ]

    challenge = res.json()
    assert all(
        [
            challenge[fieldName] == sample_challenge_template_submission[fieldName]
            for fieldName in fieldsThatShouldBeEqual
        ]
    )


@then(
    u"The returned challenge template card has consitent data with the challenge template entity"
)
def step_impl(context):
    res = st_utils.get_global_challenge_template_cards(context.app_uri)
    st_utils.validate_200_status(res)

    cards: list = res.json()
    card = next(
        (
            x
            for x in cards
            if x["challengeTemplateId"] == context.upserted_challenge_template_id
        ),
        None,
    )
    assert card is not None, "No Card found for this challenge"

    res = st_utils.get_challenge_template(
        context.app_uri, context.upserted_challenge_template_id
    )
    challenge = res.json()

    fieldMatchList = [
        ("templateName", "templateName"),
        ("challengeType", "challengeType"),
        ("difficulty", "difficulty"),
    ]

    assert all(
        card[cardKey] == challenge[challengeKey]
        for challengeKey, cardKey in fieldMatchList
    ), "Not all fields match between the challenge entity and challenge card"


@given(u"A user submits a new challenge template")
def step_impl(context):
    res = st_utils.submit_challenge_template(
        context.app_uri, sample_challenge_template_submission
    )
    st_utils.validate_200_status(res)
    context.upserted_challenge_template_id = res.json()["challengeTemplateId"]


@given(u"A challenge submission reference is stored in the DB")
def step_impl(context):
    res = st_utils.get_challenge_template_submission_previews(context.app_uri)
    st_utils.validate_200_status(res)

    previews: list = res.json()
    assert any(
        x["challengeTemplateId"] == context.upserted_challenge_template_id
        for x in previews
    ), "The challenge_template submission was not found"


@then(u"Approver B receives the challenge template detais and is able to review")
def step_impl(context):
    st_utils.validate_200_status(
        context.approver_b_start_challenge_template_review_response
    )


@then(u"Approval of the challenge template by Approver B is successful")
def step_impl(context):
    challenge_template = st_utils.get_challenge_template(
        context.app_uri, context.upserted_challenge_template_id
    ).json()
    res = st_utils.approve_challenge_template_submission(
        context.app_uri, challenge_template
    )
    st_utils.validate_200_status(res)
