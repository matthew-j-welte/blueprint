# Frontend

## Local Static Mode

Might make sense to make services into a class to better manage all this.

- Determine which _mode_ you're in while in the ctor
- If not local mode:
  - Return service with http calls
- Otherwise:
  - LAZY LOAD the local service and return it
  - Might make sense to only expose a public function that accepts some input (a)

## Workout Frontend

```
+workout/
    components/
    forms/
        exercise-form.tsx
        workout-form.tsx
        regimen-form.tsx
        dynamic-workout-entry-form.tsx
        bulk-workout-entry-form.tsx
    workout-homepage.tsx
    list-exercises-page.tsx          /exercise-list
    list-regimens-page.tsx           /workout-list
    list-workouts-page.tsx           /regimen-list
    workout-entry-page.tsx           /workout-entry
    modify-exercise-page.tsx         /exercise/new  |  /exercise/edit/xyz-123-abc  |  /exercise/publish/xyz-123-abc
    modify-workout-page.tsx          /workout/new   |  /workout/edit/xyz-123-abc   |  /workout/publish/xyz-123-abc
    modify-regimen-page.tsx          /regimen/new   |  /regimen/edit/xyz-123-abc   |  /regimen/publish/xyz-123-abc
    published-exercise-page.tsx      /published-exercise/xyz-123-abc
    published-workout-page.tsx       /published-workout/xyz-123-abc
    published-regimen-page.tsx       /published-regimen/xyz-123-abc


```

### workout-homepage

A central component to the +workout module where we can display all the navigations/functionality regarding workouts/regimens/exercises.

We can break down the link between regimen->workout->exercise, how exercise can go from my-exercises -> publised-exercise, the role blue points plays, how blue points are calculated for the most part (dont go too in depth), goal setting logic etc.

We should also be able to nav to our active workout, active regimen, next exercise, my-exercises, published-exercises, my-workouts, published-workouts, my-regimens, published-regimens etc.

How will this differ from the homepage though?

I guess homepage will have leaderboards, user stats, navs for more leaderboards + user stats etc. It will be the top level navs with some high level info. Depending how it looks, we could add some dynamic parts to allow a user to hover over workout (or something) then navigate directly to new (exercise,workout,regimen) etc.

---

---

---

# Backend

## FitnessTrackerService

```
    Services/
        ExerciseInitService
        ExerciseInitService
```

# SCRATCH

**To Complete Exercise Publish**

- [x] Add callout and example for basic/focused to trainer level mapping in feature file
- [x] Add prompt on frontend if muscle groupings were changed + add field on view model specifying if they were
- [x] Make modal telling user rules of pre publish after saving
- [x] Make general publish requests page where all pending requests can be viewed + ADD LINK TO MODAL on publish
- [ ] Make admin publish requests page where all pending requests can be viewed
- [ ] Add logic to exercise form for:
  - [ ] formula component
  - [ ] formula component
  - [ ] field checkmarks (make a generic input field with an edit/approve/reject button. reject should auto reject the whole form?)

**FLOW**

you land on the landing page..as a new user..

you see some title about blueprint gym..

you scan the navvarm ut should give you a rough idea of what this site offers

whats this site all about?

this is a landing page, dont think so technically, should show the main selling points of the site. the things people will most likely be drawn in by.

buzz words: Visualize, Graph, Grow, Simple but Expansive,

so landing page should focus on (in order):

1. Visualize workout progress with simple graphics (goes to workout homepage)
   1a. Either with the above, or immediately after, specify you can quickly pick from our workout templates to get started now. OR maybe put this somewhere near this sign up, that way users don't think they have to create like 20 things before they can start using it. (goes to global workout templates page + sort by popular)
2. Learn from our repository of exercises with matching instructional videos (goes to global exercise page, sorts by most popular)
3.

---

Important.. if i am going to do leaderaboards, I am going to have to have code that scane the list of workout entries, and its corresponding points earned and date submitted and test for the validitity of the workout. This might get dicey tho. I guess I could include options to: challenge the request (dangeerous), remove workout entries that were flagged and re-enter global leaderboards

but even with all this.. whats to keep someone from just adding a few more sets every day and then slowly adding more and more.. I mean I guess nobody would do that and just not workout (unless I offered worthy prizes)

DONT DO LEADERBOARDS.

it will ruin the legitimacy of "blue score" and the progress charts. people will lose interest in using it after cheating and then trying to compete with unrealistic numbers after that.

---

Scoring:

- Maybe we handle exercise score normally for crossfit sets and simply apply bonuses after that calculation based on break time in between exercises, break time in between super sets etc

Milestone 1 Scenario:

1.  I want to create and publish the following exercises: Chest Flies, Pistol Squat, KB Squeeze Press, Calf Raises, Chest Press, Situps
2.  From those exercises, create a super set workout. Be able to select the equipment/variation you want for each exercise.
3.  Be able to find that workout, and view it in a clear and helpful way. (Design this exactly how you want it. you're the consumer here because you actually need this, so trust your instincts)
4.  From my homepage or the workout details page, be able to start an active entry set for that workout
5.  First submit your goals, then start, then Log all your workout data including reps, weight etc. and have the time in between sets/super sets be monitored. Ensure they are also comparing your score with your goals in some clean way.
6.  On each submission calculate the blue score and render it in a pretty way, then have it shown on the pill
7.  Complete your workout
8.  Be able to view your list of completed workouts in chrono order
9.  Be able to click that last workout and view all the results in a clear and helpful tabular format
10. Be able to group workouts by workout type so you can easily visually compare previous workouts and view your progression

Equipment Selections:

- General Weight (for exercises where the equipment doesn't matter: for example, weighted situps.)

---

Components Needed:

Reusable:

- card
- buttons
- save buttons
- hover effects
- font
- color
- panel
- special icons
  - subtitles
  - logo
  - navbar

Special:

- Muscle Selector
  - _Be able to highlight a button/area and hover the body to be bigger but also like 50% opacity_
- Difficulty Selector
- Label Selector
- Resource Publish status/progress bar on top when new/edit/pre-publish/publish page active
- Navbar
