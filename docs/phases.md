# Blueprint

## Phase 1

_Exercise App Usable_

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
  - when you do make sure you warn the user (with a box for 'dont show this again') that it won't change previous scores, so your smart score may experience a sudden spike.
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

_Recipe Portion of Cooking App Usable_

TBD

## Phase 3

_Setup Blueprint and have the exercise and cooking app available on it. Figure out how you're going to do logins across all the apps and Blueprint itself. Implement it. Setup a 'How to use' section._

## Phase 4
