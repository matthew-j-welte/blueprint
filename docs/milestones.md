# Milestones

## Milestone 1

**Scenarios**

Create and use a workout:

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

Tasks:

- (1):
  - Solidify the use/need for exercise labels
  - Create formula component that can handle the following cases:
    - Varying equipment (same params or diff)
    - General Weight (for situp for example)
- (2)
  - List out all the "special workout" types and decide how you'll link the blue score with the different special workouts
  - Blue score is the base identifier for progress. it tracks that you're still doing more and more reps+weight over time.. this way if you mix up your regimen big time you still know whether or not you're working harder or less in a visual way.
  - Workout score includes the following variables:
    - time in between sets
    - number of sets of the same exercise (can apply bonus for 12 sets of someting for ex)
    - goal comparisons
  - Be able to view this information in detail if you want (the times in between sets etc. could be included in he table in some way)
- (3)
  - Create a view workout page
  - Create a view exercise page
- (5)
  - Create goal assignment page
- (6)
  - Find font/color for blue score
  - Create blue score popup display component
    - background could have blueprint pattern
    - hovering with text-shadow
    - moves arounda little bit (breathes for ex)
  - Create generic score-summary component for displaying blue score + extras (in this case the workout bonus score info)
  - See if you can find a way to execute formulas on the frontend
    - If not just hit an endpoint for now, not a huge deal
- (7)
  - Design workout-complete score-summary component w/ things like:
    - previous workout(s) comparisons
    - comaprisons to previous days blue score
    - show goal progress
- (8)
  - Create a workout-history-page that shows a fairly large card with workout info:
    - date time
    - duration
    - blue score
    - workout name
    - top muscles worked
    - top exercise performed
- (9)
  - Create/Implement view-workout-submission page with tabular info about the workout
- (10)
  - Create group by workout functionality in the page from (8)
- (~)
  - Create form components for easy form creation
  - Styling finalized and helpers created
  - E2E code helpers finalized (routes/exercise-form/api-client)
    - For exercise form maybe create an interface for each input that defines the input/output functions. Then create a form class with each of those fields as a property.

**Major Components and Customer Use List**
