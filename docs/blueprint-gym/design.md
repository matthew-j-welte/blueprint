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
- links to some other analytics most likely:
  - improvement by muscle grouping
  - improvement by exercise

## Regimen Statistics Page

- can navigate to this from the regimen page, we will have a number of different statistics already calculated (or maybe calculated when the user navs to this page).
- will also have a list of cards detailing other calculations you can sign up for, for this regimen. Give user's a limit as to how many they can sign up for.
  - maybe these will persist over the course of the regimen

## Workout Page

- Pulls the workoutEntry and the workoutSetEntries list
- Basically a readonly version of the New Workout page

## New Workout Page

- Need to allow two modes:
  - Active Entry Mode
  - Bulk entry mode

**Active Entry Mode**

- The main objective of this is to cater to someone who is in the middle of a workout and does not have the patience or energy to deal with slow animations, loading, or lagging.. it needs to be a fluent, easy, consistent and intuitive process, leaving each different type of exercise/set accounted for.
- Should also have larger than usual text/buttons since somebody may be more unaware/shakey when entering point right after a set.

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

## Scoring

_Key to remember: Given a person with a perfectly balanced human body and a set of exercises Y, earning 10 smart points for exercise X should require equal physical exertion as earning 10 smart points from any exercise in set Y._

### Questions

Customizable formulas?

Where do we set the numbers for each exercise?

- On exercise publish?
  - That would ensure everyone is working towards a well balanced body, regardless of where they currently are
  - Allows global competition to be straight forward

What effect should goal bonuses have?

- We can use the metrics collected from goals to establish a user's consistency and expectations.

How do we prevent people from setting unrealistically low goals ?

- I guess we could penalize ppl for being way over their goals.

What do you get from earning smart points?

- It will be the overall ranking system.
- If we go with a leveling system it will be used to get to new levels
- It will be used to more easily track exercise/workout/regimen progress (as opposed to passing around weight/rep/workoutType etc..)

Is smart points the main driver behind a user's ranking/improvement?

- See above (yes)

How do we calculate smart points for a given exercise?

- Each exercise will be assigned a dynamic formula.
- These formulas (in the form of a string) will accept the following parameters
  - reps - mostly will mean regular reps, but for cardio it could be time
  - (optional) weight - will always mean the weight you're lifting / additional weight (from weight vest for ex)
  - (optional) Body Weight - only used for exercises where your body weight matters

How will formulas/smart points look in code on the backend?

- Use a service that parses formulas, decides which inputs are needed, validates the input provided is valid, then executes the formula.
- Have a separate formula creation service that accepts dto(s) specifying the type of formula it is, and based on those fields, create a string repr.
- I guess I could have an ExerciseFormulaParser and an ExerciseFormulaExecutor.. or just one svc.. we shall see.

How will formulas/smart points look in code on the frontend?

- For assigning formulas, this should be done during "Final Validation" after a user requests to publish the exercise.
- Need to create an admin page that pulls an exercise's details
- Use a service that parses formulas, decides which inputs are needed, validates the input provided is valid, then executes the formula.
- Could we use blazor/WASM for this to avoid duplicate logic?
  - or we could write tests in a way so that they are exactly the same
  - use a loaded json file in both c# and TS and ensure they give the exact same results (put expected result in the JSON)

How do we calculate goal based points for a given exercise?

- It should definitely be percentage based (10% away from rep goal / 5% away from weight goal)
- How do I combine rep+weight diffs cleanly though. (before or after overall calc?)

  - before: prolly best option since every exercise might have different fields.
  - examples:
    - 10% rep over -- 10% weight under
    - 10% rep under -- BODYWEIGHT,
    - 20% time under -- RUNNING
  - expected payload being sent to backend:

  ```json
  {
    <entryId>: { repDiff: 0.1, weightDiff: -0.1 },
    <entryId>: { repDiff: -0.1 },
    <entryId>: { repDiff: -0.2 },
  }
  ```

  - from here on the backend calculate + store + return:
    - amount of diffs above goal
    - amount of diffs under goal
    - overall goal diff average = sum(avg(repDiff, weightDiff)) / count(sets)
    - label for your overall goal diff

- Should be able to set goals when creating a Workout.
  - This is mainly where goals will be set
- Can also open the above form in a modal
  - This modal will be prompted for before starting active/bulk entry
  - It will use the same component/save/edit logic as editting a workout
    - Or should it be a specific API call to update just the formula?
