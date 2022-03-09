## DB Models

exercise:

- id -> exerciseId
- exerciseId
- name
- author
- description
- image
- musclesWorked: []
- labels: []

workout:

- id -> workoutId
- workoutId
- name
- author
- workoutSets (list of typeof 'workoutSet'):
  - setType (regular, crossfit, weave)
  - setAim (strength, conditioning, distance)
  - exercises (has to be one if regular, else has to be more than one):
    - exerciseId
    - exerciseName
    - specialExerciseFlag (1 = isCountdownExercise, 2 = isWeaveExercise)
    - exerciseIcon

regimen:

- id -> regimenId
- regimenId
- name
- author
- startDate
- endDate
- workouts:
  - workoutId
  - name

## View Models / DTOs
