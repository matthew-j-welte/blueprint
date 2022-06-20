**May 1st**

- _Cant Hurt Me_ book complete

**May 15th**

- _Hooked_ book complete
- Frontend Complete w/ different views / local mode working for each top level components
- Have

**May 29th**

- _Spark_ book complete
- All BDD tests created

**June 19th**

- _Microservices: Designing Fine Grained Systems_ book complete
- Backend created
- All BDDs passing

---

**July 3rd**

- _Cant Hurt Me_ book complete
- E2E Scenarios re-created (for this milestone)
- Form Helpers created
- Styling finalized and helpers created
- E2E code helpers finalized (routes/exercise-form/api-client)

**July 10th**

- Formula creation functionality working
- List out all the "special workout" types and decide how you'll link the blue score with the different special workouts
  - Blue score is the base identifier for progress. it tracks that you're still doing more and more reps+weight over time.. this way if you mix up your regimen big time you still know whether or not you're working harder or less in a visual way.
  - Workout score includes the following variables:
    - time in between sets
    - number of sets of the same exercise (can apply bonus for 12 sets of someting for ex)
    - goal comparisons
  - Be able to view this information in detail if you want (the times in between sets etc. could be included in he table in some way)

**July 17th**

- _The Full life Framework_ book
- Create a view workout page
- Create a view exercise page
- Create goal assignment page

**July 24th**

- Find font/color for blue score
  - Create blue score popup display component
    - background could have blueprint pattern
    - hovering with text-shadow
    - moves arounda little bit (breathes for ex)
- Create generic score-summary component for displaying blue score + extras (in this case the workout bonus score info)
- See if you can find a way to execute formulas on the frontend
  - If not just hit an endpoint for now, not a huge deal
- Design workout-complete score-summary component w/ things like:
  - previous workout(s) comparisons
  - comaprisons to previous days blue score
  - show goal progress

**July 31st**

- Create a workout-history-page that shows a fairly large card with workout info:
  - date time
  - duration
  - blue score
  - workout name
  - top muscles worked
  - top exercise performed
- Create group by workout functionality in the page above
- Create/Implement view-workout-submission page with tabular info about the workout

**FUTURE**

- Homepage with the different app choices and a few "Coming Soon" boxes as well
- possible designs =
  - a house with blueprint type colors/lines
  - a full page view that looks like a blueprint and the different apps are evenly scattered
- Blueprint Gym
  - Stats/Achievements improvements
- Blueprint Office
  - Add todo/calendar functionality
  - Logic from outlook email
- Blueprint Kitchen
- Blueprint Classroom
- Blueprint Finance (placeholder name)
- Blueprint Arcade
