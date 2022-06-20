@ExerciseTracker
Feature: Exercise Publish

  This contains the workflow needed to bring an exercise from creation/edit, to pre-publish, then finally to being published globally for all to use.

  Scenario: New Exercise Creation
    Given The ExerciseTracker Web API is running
    And The blueprint-gym client is running
    And A user navigates to the new exercise page
    # And The user is logged in
    When The user selects Focused muscle specificity
    And The user fills out valid information for all input fields on the new exercise form
      | input          |
      | exerciseName   |
      | difficulty     |
      | description    |
      | exerciseLabels |
      | musclesWorked  |
    And The user clicks the add exercise button
    Then The exercise is stored in the user's exercise library
    # And No other regular user can access this exercise
    And The client shows a prompt stating the exercise was saved succesfully
    And The modal shows links to add another and view my exercises
    And The add another and view my exercises links all load the proper page

  Scenario: Exercise Edit
    Given The ExerciseTracker Web API is running
    And The blueprint-gym client is running
    # And The user is logged in
    When The user navigates to the edit page for a previously created exercise
    And The user changes the values of the following fields
      | input          |
      | difficulty     |
      | description    |
      | exerciseLabels |
      | musclesWorked  |
    And The user clicks update exercise
    Then The exercise is saved with the updated information
    And The client shows a prompt stating the exercise was saved succesfully
    And The modal shows a link to view my exercises
    And The view my exercises link loads the proper page

  Scenario: Muscles worked mapped from basic to trainer level on pre-publish
    Given The ExerciseTracker Web API is running
    And The blueprint-gym client is running
    # And The user is logged in
    And A previously created exercise with the following muscles selected from the Basic level muscle grouping
      | muscles |
      | Chest   |
      | Back    |
    When The user navigates to the pre-publish page for that exercise
    Then The following muscles are pre-selected from the Trainer level muscle grouping
      | muscles     |
      | Upper Chest |
      | Lower Chest |
      | Upper Back  |
      | Lower Back  |

  Scenario: Muscles worked mapped from focused to trainer level on pre-publish
    Given The ExerciseTracker Web API is running
    And The blueprint-gym client is running
    # And The user is logged in
    And A previously created exercise with the following muscles selected from the Focused level muscle grouping
      | muscles     |
      | Upper Chest |
      | Lower Chest |
      | Upper Back  |
      | Lower Back  |
    When The user navigates to the pre-publish page for that exercise
    Then The following muscles are pre-selected from the Trainer level muscle grouping
      | muscles     |
      | Upper Chest |
      | Lower Chest |
      | Upper Back  |
      | Lower Back  |

  Scenario: Muscles worked mapped from trainer to trainer level on pre-publish
    Given The ExerciseTracker Web API is running
    And The blueprint-gym client is running
    # And The user is logged in
    And A previously created exercise with the following muscles selected from the Trainer level muscle grouping
      | muscles     |
      | Upper Chest |
      | Lower Chest |
      | Upper Back  |
      | Lower Back  |
    When The user navigates to the pre-publish page for that exercise
    Then The following muscles are pre-selected from the Trainer level muscle grouping
      | muscles     |
      | Upper Chest |
      | Lower Chest |
      | Upper Back  |
      | Lower Back  |

  Scenario: Exercise Pre Publish
    Given The ExerciseTracker Web API is running
    And The blueprint-gym client is running
    # And The user is logged in
    When The user navigates to the pre-publish page for a previously created exercise
    And The following fields are already pre-populated
      | input          |
      | exerciseName   |
      | difficulty     |
      | description    |
      | exerciseLabels |
      | musclesWorked  |
    # And The muscles worked are pre-selected based on previously selected muscle groups (or specific muscles)
    # And The description value is too small for the pre-publish requirements
    # And The pre-publish button is disabled
    # And The user updates the description to be longer and more in depth
    And The user clicks the pre-publish button
    Then An exercise publish request is saved
    And The client shows a prompt explaining the rules of publishing with a link to publish requests page
    And The link to the publish requests page works

  Scenario: Exercise Publish
    Given The ExerciseTracker Web API is running
    And The blueprint-gym client is running
    # And The user is logged in
    When An admin navigates to the pending publish requests page looking to approve a previously pre-published exercise
    And The admin selects the exercise publish request matching theirs
    And The client navigates to the publish review page
    # And The following fields are already pre-populated
    #   | input          |
    #   | exerciseName   |
    #   | difficulty     |
    #   | description    |
    #   | exerciseLabels |
    #   | musclesWorked  |
    # And The admin changes the values of the following fields
    #   | input          |
    #   | difficulty     |
    #   | description    |
    #   | exerciseLabels |
    #   | musclesWorked  |
    # And The admin approves the following fields as valid
    #   | input          |
    #   | exerciseName   |
    #   | difficulty     |
    #   | description    |
    #   | exerciseLabels |
    #   | musclesWorked  |
    # And The admin uploads a video for the exercise
    And The admin creates the exercise blue score formula
    And The admin clicks publish
    Then The exercise is published
    And A notification is sent to the exercise creator's accont
    And The user clicks the notification
    And The notification shows the changes made to the exercise

