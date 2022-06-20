import time
from typing import List
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.remote.webelement import WebElement


class E2EConfig:
    def __init__(self, **kwargs) -> None:
        self.browser: WebDriver = kwargs.get("browser")
        self.speed = kwargs.get("speed")


def clickSaveExerciseBtn(e2econfig: E2EConfig):
    e2econfig.browser.find_element_by_id("save-exercise-btn").click()


def clickFocusedMuscleGroupPane(e2econfig: E2EConfig):
    e2econfig.browser.find_element_by_id("focused-pane").click()


def getSelectedPills(e2econfig: E2EConfig) -> List[str]:
    return [x.get_attribute("id") for x in e2econfig.browser.find_elements_by_class_name("selectable-pill-selected")]


def clearInput(e2econfig: E2EConfig, name: str):
    e2econfig.browser.find_element_by_id(name).clear()


def inputText(e2econfig: E2EConfig, name: str, value: str):
    e2econfig.browser.find_element_by_id(name).send_keys(value)


def inputDifficulty(e2econfig: E2EConfig, value: str):
    enum = dict(
        Beginner=0,
        Easy=1,
        Moderate=2,
        Advanced=3,
        Expert=4,
        Dangerous=5,
    )[value]
    e2econfig.browser.find_element_by_id("difficulty").click()
    time.sleep(0.25)
    action = ActionChains(e2econfig.browser)

    downKeys = [Keys.DOWN for _ in range(enum)]
    action.send_keys(downKeys + [Keys.ENTER]).perform()


def clickButtons(e2econfig: E2EConfig, ids: list):
    for _id in ids:
        time.sleep(0.05)
        e2econfig.browser.find_element_by_id(_id).click()


def inputExerciseEditForm(e2econfig: E2EConfig, fields: list, exercise: dict, override=False):
    for field in fields:
        inputValue = exercise[field]
        time.sleep(0.25)
        if field == "exerciseLabels" or field == "musclesWorked":
            clickButtons(e2econfig, inputValue)
        elif field == "difficulty":
            inputDifficulty(e2econfig, "Advanced")
        else:
            if override:
                clearInput(e2econfig, field)
            inputText(e2econfig, field, inputValue)


def getExerciseFormModel(context):
    selectedPills = getSelectedPills(context.config.e2econfig)
    musclesWorked = [x for x in selectedPills if x in context.config.exercise.get("musclesWorked", [])]
    exerciseLabels = [x for x in selectedPills if x in context.config.exercise.get("exerciseLabels", [])]

    return dict(
        exerciseName=context.config.exercise.get("exerciseName", None),
        difficulty=context.config.exercise.get("difficulty", None),
        description=context.config.exercise.get("description", None),
        exerciseLabels=exerciseLabels,
        musclesWorked=musclesWorked,
        muscleSpecificity=context.config.exercise.get("muscleSpecificity", None),
    )


def validateExerciseFormFields(**kwargs):
    validationMap = dict(
        exerciseName=lambda data: data != None and data != "" and len(data) > 2,
        difficulty=lambda data: data in [0, 1, 2, 3, 4, 5],
        description=lambda data: data != None and data != "" and len(data) > 10,
        exerciseLabels=lambda data: all(x != None and x != "" for x in data),
        musclesWorked=lambda data: all(x != None and x != "" for x in data),
        muscleSpecificity=lambda data: data in [0, 1, 2],
    )

    return {k: validationMap[k](v) for k, v in kwargs.items()}


def clickPublishLinkForExercise(e2econfig: E2EConfig, exerciseId: str):
    e2econfig.browser.find_element_by_id("publish-link-" + exerciseId).click()