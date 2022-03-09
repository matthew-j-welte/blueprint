from behave import given, when, then
from utils import is_app_running, register
from http import HTTPStatus

sample_registration = {
    "fullName": "New Man",
    "accountName": "NewMan",
    "weight": 199,
    "workoutFrequency": 21,
    "profilePicUrl": "account-photos::NewMan.jpeg",
    "defaultWebpageTheme": None,
    "memberConnections": [],
    "currentShape": "Pretty out of shape",
    "strengths": ["Yoga", "Swimming"],
    "weaknesses": ["Cardio", "Injury prone", "Leg exercises"],
    "goals": ["Lose some weight", "Lose a ton of weight"],
    "modifiedOn": "0001-01-01T00:00:00.0000000+00:00",
}


@when(u"A user submits a registration with all data filled out")
def step_impl(context):
    res = register(context.app_uri, sample_registration)
    context.res = res.json()
    assert res.status_code == HTTPStatus.OK


@then(u"The member account is succesfully created and returned")
def step_impl(context):
    assert len(context.res["memberId"]) > 0


@then(u"The User's account picture is uploaded")
def step_impl(context):
    raise NotImplementedError(u"STEP: The User's account picture is uploaded")


@given(u"A user submits a registration with an account name that is already taken")
def step_impl(context):
    raise NotImplementedError(
        u"STEP: Given A user submits a registration with an account name that is already taken"
    )


@then(u"The member account is not created")
def step_impl(context):
    raise NotImplementedError(u"STEP: Then The member account is not created")


@then(u"A response is returned detailing the account name collision issue to the user")
def step_impl(context):
    raise NotImplementedError(
        u"STEP: Then A response is returned detailing the account name collision issue to the user"
    )
