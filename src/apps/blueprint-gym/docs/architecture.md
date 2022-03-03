# Blueprint Gym Architecture

## Services

### Exercise Service

_Justification: If all other services are down. We should still be able to view all exercises available on gym.blueprint_

Models:

- Exercise (exerciseId)
  - exerciseId
  - name
  - labels: string[]
  - muscleGroups
- ExerciseRef (type + published + page?)
  - A ref to an exercise - should contain enough data to make a card for the frontend in one query
- ExercisePublishSubmissionRef (type + page?)
- MemberExerciseStatistics

Controllers:

ExerciseController:
Get(string id) (GET -> ExerciseDto)
Save(ExerciseFormView exerciseForm) (PUT -> ExerciseDto)
Delete(string id) (DELETE -> bool)
GetAll() (GET -> List<ExerciseCardDto>)

ExerciseAdminController:
Unpublish(string exerciseId, bool andDelete = false) (DELETE -> bool)
PublishExercise(PublishExerciseFormView exerciseForm) (PUT -> ExerciseDto)
GetAllPublishSubmissionRefs() (GET -> List<ExerciseCardDto>)

ExerciseStatisticsController:
Save

Services:

### Gym Member Statistics Service

### Exercise Tracking Service

_Justification: If all other services are down. We should still be able to view all exercises available on gym.blueprint_

### Workout Service

_Justification: If all other services are down. We should still be able to view all previously stored workouts and examine its sets/exercises. We just won't be able to drill down into exercise details that are hosted on the exercise svc_

Models:

- Workout (workoutId)
- WorkoutRef (type + page?)
- UserWorkout (workoutId + userId)
- UserWorkoutRef (type + page?)
- WorkoutEntry
- WorkoutEntryRef

Reqs

- Posts new workout
- Stores all globally published + approved workouts
- Handles all needed workout publishing + approvals / rejections
- Stores all user created workout (with a limit per user)

Controllers:

- WorkoutController
- WorkoutAdminController
- WorkoutTemplateController (for publishing and getting/saving workout templates)

### Workout Tracking Service

### Regimen Service

_Justification: If all other services are down. We should still be able to view all previously stored regimens and examine its workouts' details. We just won't be able to drill down into workout details that are hosted on the workout svc_

Models:

- PublishedRegimen (regimenId)
- PublishedRegimenRef (type + page?)
- UserRegimen (regimenId + userId)
- UserRegimenRef (type + page?)
- RegimenEntry
- RegimenEntryRef

Reqs

- Posts new regimen
- Stores all globally published + approved regimens
- Handles all needed regimen publishing + approvals / rejections
- Stores all user created regimens (with a limit per user)
- Allow users to archive old regimens?

### RepTrackingService???

Models:

Reqs:

- Recieves and stores all the rep info for exercise level tracking

### RegimenTrackingService???

---

---

RANDOM:

Ab Roll
Left Pushup
Right Pushup
Pushup
Jump to deadlift position
Deadlift
Calf Raise
Upward Row
Reverse Bicep Curl
Front Squat to Shoulder Press
Left Tilt shoulder Press?
Right Tilt shoulder Press?
Tricep Curl
Front Lunge

---

## Flow

#1

- go to blueprint.gym logged in
- arrive at homepage
- homepage should show:

  - navbar
  - link to enter point for your next workout
    - click this and:
      - a page shows "active entry" or "bulk entry"
      - based on that bring them to the:
        - active entry screen
        - or
        - bulk entry screen
  - recent accomplishments
  - Add new:
    - exercise
    - workout
    - regimen
  - Browse:
    - exercises
    - workouts
    - regimens

- create an exercise
- go to "create workout"
- create a new workout with
  - 1 strength aimed crossfit set
  - 1 cardio aimed crossfit set
- submit the workout with a name
- from the backend:
  - workout service stores the workout and generates a globally unique workoutId
  - passes that workoutId + userId to some event bus that is ingested by
  - returns that workoutId
  -

How will a user view old regimens/workouts/sets?

A user will most likely want to view exercise specific data

- need to store exercise entries partitioned on exerciseId+userId

A user will want to view workout data

- can store this when a user finishes entering exercise data (completes the workout)

Sets aren't stored individually so I think it would make sense for a user to
