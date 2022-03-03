from behave import given, when, then
import utils as st_utils
import time
from http import HTTPStatus
from collections import defaultdict


class ChallengeType:
    Basic = 0
    Roulette = 1
    Showtime = 2
    FinishLine = 3
    LastOneStanding = 4


class ChallengeDifficulty:
    Beginner = 0
    Easy = 1
    Moderate = 2
    Advanced = 3
    Expert = 4
    Master = 5


@given("A user begins creating a new challenge")
def step_impl(context):
    context.challenge = dict(
        name="BDD Challenge",
        start="2021-08-05T00:00:00.0000000+00:00",
        end="2021-08-05T00:01:00.0000000+00:00",
        inviteTimeoutMinutes=10,
        offDays=10,
        challengeType=ChallengeType.Basic,
        difficulty=ChallengeDifficulty.Moderate,
    )


@given("The user adds a set of members to a new challenge")
def step_impl(context):
    context.challenge["participants"] = [
        dict(memberAccountName=row[0], memberId=row[0]) for row in context.table
    ]
    memberAdminName = context.table[0][0]
    context.challenge["admin"] = dict(
        adminMemberId=memberAdminName, adminAccountName=memberAdminName
    )


@given("A user adds a set of exercises to a new challenge")
def step_impl(context):
    challengeExercisesLookup = dict()

    for row in context.table:
        exercise_name, additional_weight, reps_per_point = row
        challengeExercisesLookup[exercise_name] = (
            challengeExercisesLookup[exercise_name]
            if exercise_name in challengeExercisesLookup
            else dict(
                exerciseId=exercise_name,
                exerciseName=exercise_name,
                dailyPointMax=100,
                exerciseRules=dict(),
            )
        )
        challengeExercisesLookup[exercise_name][additional_weight] = dict(
            addedWeight=additional_weight, repsPerPoint=int(reps_per_point)
        )
    context.challenge["challengeExercisesLookup"] = challengeExercisesLookup


@given("The user submits the challenge")
def step_impl(context):
    res = st_utils.post_new_challenge(context.app_uri, context.challenge)
    st_utils.validate_200_status(res)
    context.upserted_challenge = res.json()


@given("A set {_} points are tallied through RepTracking by member {member}")
def step_impl(context, _: str, member: str):
    upserted_challenge = context.upserted_challenge

    context.challenge_statistics = (
        context.challenge_statistics if "challenge_statistics" in context else dict()
    )
    context.challenge_statistics[member] = []
    for row in context.table:
        exercise_name, additional_weight, points = row
        repsPerPoint = context.challenge["challengeExercisesLookup"][exercise_name][
            additional_weight
        ]["repsPerPoint"]
        reps = int(points) * int(repsPerPoint)

        statistic = dict(
            challengeId=upserted_challenge["challengeId"],
            order=0,
            memberId=member,
            exerciseId=exercise_name,
            reps=int(reps),
            points=int(points),
            addedWeight=additional_weight,
        )
        context.challenge_statistics[member].append(statistic)
        res = st_utils.post_challenge_statistic(context.app_uri, statistic)
        st_utils.validate_200_status(res)


@when("A challenge member navigates to the challenge dashboard")
def step_impl(context):
    context.leaderboard_refresh_res = st_utils.get_leaderboard(
        context.app_uri, context.upserted_challenge["challengeId"]
    )


@when("A challenge totals refresh occurs")
def step_impl(context):
    st_utils.validate_200_status(context.leaderboard_refresh_res)
    context.challenge_leaderboard = context.leaderboard_refresh_res.json()


@when("The totals calculations for member {member} are correct")
def step_impl(context, member: str):
    statisticCounter = defaultdict(int)

    for statistic in context.challenge_statistics[member]:
        exercise = statistic["exerciseId"]
        addedWeight = statistic["addedWeight"]
        statsKey = f"{member}-{exercise}-{addedWeight}"

        statisticCounter[statsKey] = statisticCounter[statsKey] + statistic["points"]

    for row in context.table:
        exercise_name, additional_weight, points = row
        totalStatsKey = f"{member}-{exercise_name}-{additional_weight}"

        assert int(statisticCounter[totalStatsKey]) == int(
            points
        ), f"Points tallied from statistics ({statisticCounter[totalStatsKey]}) does not equal expected points ({points})"


@when("The challenge completes")
def step_impl(context):
    res = st_utils.complete_challenge(
        context.app_uri, context.upserted_challenge["challengeId"]
    )
    st_utils.validate_200_status(res)
    context.completed_challenge_dto = res.json()


@then("member {member} is declared the winner")
def step_impl(context, member: str):
    assert context.completed_challenge_dto["winnerMemberId"] == member, (
        context.completed_challenge_dto["winnerMemberId"] + "  ----  " + member
    )


@then("member {member} is definitely not declared the winner because he is a loser")
def step_impl(context, member: str):
    assert context.completed_challenge_dto["winnerMemberId"] != member
