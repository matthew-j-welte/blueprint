from ctypes import util
import time
import requests
from behave import given, when, then
from helpers import utils, routes, commands, api_client
from environment import E2EConfig


@given("The ExerciseTracker Web API is running")
def step_impl(context):
    app_running, res = utils.is_app_running(context.config.url_lookups["ExerciseTracker"])
    if res is None:
        assert False, "Connection was refused"
    assert app_running, "ExerciseTracker returned a status of " + str(res.status_code)


@given("The blueprint-gym client is running")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.get(routes.home)
    e2econfig.browser.maximize_window()


@given("A user navigates to the new exercise page")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.get(routes.newExercise)
    time.sleep(1)


@when("The user selects Focused muscle specificity")
def step_impl(context):
    commands.clickFocusedMuscleGroupPane(context.config.e2econfig)


@when("The user fills out valid information for all input fields on the new exercise form")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig
    exerciseToAdd = dict(
        exerciseName="Icky Wicky Kickies",
        difficulty="Advanced",
        description="This is an exercise where you jump up and do icky wicky kickies, make sense?",
        exerciseLabels=["Injury Prone", "Cardio"],
        musclesWorked=["Upper Front Legs", "Glutes"],
    )
    commands.inputExerciseEditForm(
        e2econfig,
        [x["input"] for x in context.table],
        exerciseToAdd,
    )

    context.config.exercise = exerciseToAdd


@when("The user clicks the pre-publish button")
@when("The user clicks the add exercise button")
@when("The user clicks update exercise")
def step_impl(context):
    commands.clickSaveExerciseBtn(context.config.e2econfig)
    time.sleep(2)


@then("The exercise is stored in the user's exercise library")
def step_impl(context):
    found = utils.get_exercise_by_name("Icky Wicky Kickies")
    context.config.exerciseId = found["exerciseId"]


@then("The client shows a prompt stating the exercise was saved succesfully")
def step_impl(context):
    time.sleep(0.25)
    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.find_element_by_id("exercise-saved-prompt-modal")


@then("The modal shows links to add another and view my exercises")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.find_element_by_id("my-exercises-link")
    e2econfig.browser.find_element_by_id("add-another-link")


@then("The add another and view my exercises links all load the proper page")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig

    myExerciseLink = e2econfig.browser.find_element_by_id("my-exercises-link").get_attribute("href")

    # validate add another
    e2econfig.browser.find_element_by_id("add-another-link").click()
    time.sleep(1)
    exerciseNameInputValue = e2econfig.browser.find_element_by_id("exerciseName").get_attribute("value")
    assert exerciseNameInputValue == "", (
        exerciseNameInputValue + " should be null, most likely data was not cleared from last edit!"
    )

    # validate my exercises
    e2econfig.browser.get(myExerciseLink)
    time.sleep(1)


@when("The user navigates to the {form_action} page for a previously created exercise")
def step_impl(context, form_action: str):
    exerciseToAdd = dict(
        exerciseName="Edit Exercise Test",
        difficulty=2,
        description="This is some test workout",
        exerciseLabels=["Injury Prone", "Cardio"],
        musclesWorked=["Upper Chest", "Lower Chest", "Triceps"],
        muscleSpecificity=2,
    )
    res = api_client.add_new_exercise(exerciseToAdd)
    assert res.status_code == 200, "New Exercise request failed w/ error: " + res.text
    addedExercise = res.json()
    context.config.exercise = addedExercise
    context.config.exerciseId = addedExercise["exerciseId"]
    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.get(
        (routes.editExercise if form_action == "edit" else routes.prePublish) + context.config.exerciseId
    )
    time.sleep(1)


@when("The user changes the values of the following fields")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig
    updated_form = dict(
        difficulty="Expert",
        description="UPDATES",
        exerciseLabels=["Barbell"],
        musclesWorked=["Upper Front Legs", "Lower Back"],
    )

    # clear previously selected
    time.sleep(0.5)
    commands.clickButtons(e2econfig, context.config.exercise["musclesWorked"])
    commands.clickButtons(e2econfig, context.config.exercise["exerciseLabels"])
    commands.inputExerciseEditForm(e2econfig, [x["input"] for x in context.table], updated_form, override=True)


@then("The exercise is saved with the updated information")
def step_impl(context):
    res = requests.get(
        routes.getExercise + context.config.exerciseId,
        headers={"Content-type": "application/json", "Accept": "application/json"},
    )
    exercise = res.json()
    assert exercise["description"] == "UPDATES"
    assert "Barbell" in exercise["exerciseLabels"], "Barbell not found in " + ", ".join(exercise["exerciseLabels"])
    assert "Upper Front Legs" in exercise["musclesWorked"] and "Lower Back" in exercise["musclesWorked"]


@then("The modal shows a link to view my exercises")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.find_element_by_id("my-exercises-link")


@then("The view my exercises link loads the proper page")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig

    myExerciseLink = e2econfig.browser.find_element_by_id("my-exercises-link").get_attribute("href")

    # validate my exercises
    e2econfig.browser.get(myExerciseLink)
    time.sleep(1)


@given("A previously created exercise with the following muscles selected from the {specificity} level muscle grouping")
def step_impl(context, specificity):
    specificityMap = dict(Basic=0, Focused=1, Trainer=2)
    exerciseToAdd = dict(
        exerciseName="Some Test Workout",
        difficulty=2,
        description="This is some test workout",
        exerciseLabels=["Injury Prone", "Cardio"],
        musclesWorked=[x["muscles"] for x in context.table],
        muscleSpecificity=specificityMap[specificity],
    )
    res = api_client.add_new_exercise(exerciseToAdd)
    assert res.status_code == 200, "New Exercise request failed w/ error: " + res.text
    addedExercise = res.json()
    context.config.exercise = addedExercise
    context.config.exerciseId = addedExercise["exerciseId"]


@when("The user navigates to the pre-publish page for that exercise")
def step_impl(context):
    e2econfig: E2EConfig = context.config.e2econfig
    assert context.config.exerciseId != None and context.config.exerciseId != "", (
        context.config.exerciseId + " should be a value"
    )
    e2econfig.browser.get(routes.prePublish + context.config.exerciseId)
    time.sleep(1)


@then("The following muscles are pre-selected from the Trainer level muscle grouping")
def step_impl(context):
    buttonIds = commands.getSelectedPills(context.config.e2econfig)
    for muscleGroup in context.table:
        muscleGroup = muscleGroup["muscles"]
        assert muscleGroup in buttonIds, muscleGroup + " is not selected"


@when("The following fields are already pre-populated")
def step_impl(context):
    exerciseFormData = commands.getExerciseFormModel(context)
    validationMap = commands.validateExerciseFormFields(**exerciseFormData)
    for form_field, is_valid in validationMap.items():
        form_data_value = exerciseFormData[form_field]
        saved_exercise_value = context.config.exercise[form_field]

        assert is_valid, (
            f"{form_field}" + " is invalid - got: {form_data_value} but was expecting {saved_exercise_value}"
        )

        if isinstance(saved_exercise_value, list):
            form_data_value.sort()
            saved_exercise_value.sort()
        if isinstance(saved_exercise_value, str):
            form_data_value.strip()
            saved_exercise_value.strip()

        assert form_data_value == saved_exercise_value, f"{form_data_value} != {saved_exercise_value}"


@then("An exercise publish request is saved")
def step_impl(context):
    exerciseId = utils.get_exercise_by_name(context.config.exercise["exerciseName"])["exerciseId"]
    my_reqs_response = api_client.get_my_publish_requests("1")
    admin_reqs_response = api_client.get_admin_publish_requests("1")
    utils.validate_200_status(my_reqs_response)
    utils.validate_200_status(admin_reqs_response)
    my_reqs = [x["exerciseId"] for x in my_reqs_response.json()]
    admin_reqs = [x["exerciseId"] for x in admin_reqs_response.json()]

    assert exerciseId in my_reqs, f"Did not find your exercise in my publish requests list: {my_reqs}"
    assert exerciseId in admin_reqs, f"Did not find your exercise in the admin requests list: {admin_reqs}"


@then("The client shows a prompt explaining the rules of publishing with a link to publish requests page")
def step_impl(context):
    time.sleep(0.25)
    e2econfig: E2EConfig = context.config.e2econfig
    e2econfig.browser.find_element_by_id("exercise-saved-prompt-modal")

    myExerciseLink = e2econfig.browser.find_element_by_id("my-publish-requests-link").get_attribute("href")
    context.config.myExerciseLink = myExerciseLink


@then("The link to the publish requests page works")
def step_impl(context):
    context.config.e2econfig.browser.get(context.config.myExerciseLink)


@when("An admin navigates to the pending publish requests page looking to approve a previously pre-published exercise")
def step_impl(context):
    exerciseToAdd = dict(
        exerciseName="Publish Exercise Test",
        difficulty=2,
        description="This is some test workout",
        exerciseLabels=["Injury Prone", "Cardio"],
        musclesWorked=["Upper Chest", "Lower Chest", "Triceps"],
        muscleSpecificity=2,
    )
    res = api_client.add_new_exercise(exerciseToAdd)
    assert res.status_code == 200, "New Exercise request failed w/ error: " + res.text
    addedExercise = res.json()
    addedExercise["previousMuscleSpecificity"] = 2
    res = api_client.pre_publish_exercise(addedExercise)
    assert res.status_code == 200, "New Exercise request failed w/ error: " + res.text
    addedExercise = res.json()
    context.config.exercise = addedExercise
    context.config.exerciseId = addedExercise["exerciseId"]

    context.config.e2econfig.browser.get(routes.adminPublishRequestsPage + "1")


@when("The admin selects the exercise publish request matching theirs")
def step_impl(context):
    time.sleep(1)
    commands.clickPublishLinkForExercise(context.config.e2econfig, context.config.exerciseId)


@when("The admin clicks the review button on that exercise")
def step_impl(context):
    raise NotImplementedError("STEP: When The admin clicks the review button on that exercise")


@when("The client navigates to the publish review page")
def step_impl(context):
    time.sleep(1)
    e2econfig: E2EConfig = context.config.e2econfig
    "publish/" + context.config.exerciseId in e2econfig.browser.current_url


@when("The admin changes the values of the following fields")
def step_impl(context):
    raise NotImplementedError("STEP: When The admin changes the values of the following fields")


@when("The admin approves the following fields as valid")
def step_impl(context):
    raise NotImplementedError("STEP: When The admin approves the following fields as valid")


@when("The admin uploads a video for the exercise")
def step_impl(context):
    raise NotImplementedError("STEP: When The admin uploads a video for the exercise")


@when("The admin creates the exercise blue score formula")
def step_impl(context):
    raise NotImplementedError("STEP: When The admin creates the exercise blue score formula")


@when("The admin clicks publish")
def step_impl(context):
    raise NotImplementedError("STEP: When The admin clicks publish")


@then("The exercise is published")
def step_impl(context):
    raise NotImplementedError("STEP: Then The exercise is published")


@then("A notification is sent to the exercise creator's accont")
def step_impl(context):
    raise NotImplementedError("STEP: Then A notification is sent to the exercise creator's accont")


@then("The user clicks the notification")
def step_impl(context):
    raise NotImplementedError("STEP: Then The user clicks the notification")


@then("The notification shows the changes made to the exercise")
def step_impl(context):
    raise NotImplementedError("STEP: Then The notification shows the changes made to the exercise")
