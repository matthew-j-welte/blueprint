from behave import given
from utils import is_app_running


@given(u"The {app} is running")
def step_impl(context, app: str):
    context.app_uri = context.config.st_config["uris"][app]
    app_running, res = is_app_running(context.config.st_config["uris"][app])
    if res is None:
        assert False, "Connection was refused"
    assert app_running, app + " returned a status of " + str(res.status_code)
