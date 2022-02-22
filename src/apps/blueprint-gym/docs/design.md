# Pages

## Homepage

- cards for active regimens, try to guess which workout a user is there for
- cards or buttons for adding new exercise, workout,
- show some type of progress over the past X days or whatever
- show most recently earned achievements

## Add [Exercise, Workout, Regimen] Page

- Figure out a way to cleanly combine these / weave these together
- We want to make it very easy for a user to bounce between editting/creating a workout/regimen while also editting or adding new exercises. Important to note there needs to be a clear seperation between published exercises and user exercises.

**Regimen**

- Allow a user to select a muscle specificity level, for ex:

  - Beginner: Chest, Arms, Back, Core, Legs
  - Focused: Chest, Upper Chest, Lower Chest, Shoulders, Triceps, Biceps, Upper Back, Core, Quads, Hamstrings, Glutes, Calves
  - Trainer: Deltoids, Pectorals, etc..

- With this, we should probably store muscles as specific as Trainer level, so if we need to get what its "beginner" level groups are we can simply do a mapping from Muscle -> Beginner Group.

## Regimen Page

- the main focus should most likely be a prompt of some kind to begin inputting your next workout
- this is where the user will go to take a look at a summary of their active regimen
- could include some cards to previous regimens as well, and probably a link to a list of all regimens
- just show some top level info with options to dig deeper:
- regimen rating (do some calculations based on how evenly distributed muscle groups are)
- days remaining
- days in
- overall progress % [based on smart score?]
- regimen aim (heavy, cardio etc..)
- links to some other analytics most likely:
  - improvement by muscle grouping
  - improvement by exercise

## Workout Entry Page

- Need to allow two modes:
  - Active Entry Mode
  - Bulk entry mode

**Active Entry Mode**

- The main objective of this is to cater to someone who is in the middle of a workout and does not have the patience or energy to deal with slow animations, loading, or lagging.. it needs to be a fluent, easy, consistent and intuitive process, leaving each different type of exercise/set accounted for.

Some Examples:

- Chest Press
- Weighted Lunge

Flow:

- Begin workout
- Screen shows first exercise (Chest Press)
- Screen shows something signifying it's "Chest Press Set 1"
- Screen shows the first weight that the user did the last time they did this workout
- Screen shows a current running summary of the active workout (if it can fit... #1 priority is reducing too much noise. the entry boxes need to be the focal point, as remmember this is going to be used mid workout)

Nav Opts:

- Another Set
- Next Exercise
- Loop to First (show name of the first exericse.. also "loop to first" is dumb, come up with something better)
- Complete workout (needs to ALWAYS be visible)
- Maybe for easier free navigation show a top tab bar with each workout name

- When done the workout show the bulk entry readonly component and ask the user to validate.. if they need to make changes simply transition to the bulk update edittable form

**Bulk Entry Mode**

- Can probably just have rows with each exercise and then each cell is weight + reps

## Analytics Page

- place where we can go through and analyze all past data from previous workouts.
- make use of charts and different graphics for this, as well as the smart score.
