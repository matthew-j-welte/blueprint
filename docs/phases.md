# Blueprint

## HOW TO DO A PHASE

1. Draw out new high level frontend features and update existing ones (as needed).
2. While drawing take note of:

- additional fields needed (or the full models if a new component)
- all new http requests
- which service + controller that http request should go to
- the overall flow of the page

3. Transfer Drawings to proper design page (create new page if needed) and create the full e2e flow as well as a high level description

## Phase 1

_Blueprint Gym Usable_

Scenarios:

- I can add exercises with basic info
- I can create workouts from exercises
  - with a 'type' of some kind (heavy, conditioning, consistency, distance)
- I can create regimens from those workouts
  - with goals
- I can quickly startup the app and input workout info in order and have that info correctly saved to the correct workout in the correct regimen
- I can pre-populate weights for exercises in a workout
- I have a formula for calculating smart score
- I can modify my cutoff weights
  - but warn heavily against this as it will require a good bit of processing to pull all workout records and modify the smart score based on the new formula.
- I can add/remove/modify exercises in a set/workout without breaking my smart score

Tasks:

- create db models (w/ well thought out partitions)
- bring over sentrain cosmos/localdb/repo code
- create repositories
- create static frontend page for inputting exercises, workouts, regimens
- create skeleton services
- implement service functions
- connect client to backend for exercise+workout+regimen endpoint
- create static frontend page for inputting weight/reps for workouts
- create and implement endpoints + service functions for weight+rep input
- connect client to backend for weight+rep endpoint
- make an edit workout page
- make the service functions for the edit workout page

## Phase 2

_Blueprint Gym Production Ready_

Scenarios:

- TBD

Tasks

- Pagination for all models that need it!!!
