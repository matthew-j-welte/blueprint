@ExerciseTracker
Feature: Exercise Approval Workflow

  This contains the workflow needed to bring an exercise from a draft state to a published state.

  @Workflow
  Scenario: Workflow Happy Path - All data is filled out and retained upon approval
    Given The ExerciseTracker is running
    And A user submits a new Exercise with all data filled out
    And An exercise submission reference is stored in the DB
    And An exercise record is stored in the DB
    And There is no exercise card available
    When A Sentrain admin approves the exercise
    Then The submission reference is no longer returned from the submissions query
    And An exercise card is made available

  @DataIntegrity
  Scenario: Workflow Happy Path - All data is filled out and retained upon approval
    Given The ExerciseTracker is running
    And A user submits a new Exercise with all data filled out
    When A Sentrain admin approves the exercise
    Then The returned exercise model retains all expected data of the initial submission
    And The returned exercise card has consitent data with the exercise entity

  @DataConsistency
  Scenario: Avoid Approver Collision - Approver B cannot review when approver A is already reviewing
    Given The ExerciseTracker is running
    And A user submits a new Exercise with all data filled out
    And An exercise submission reference is stored in the DB
    And Approver A loads the exercise submission references
    And Approver B loads the same exercise submission references
    And Approver A begins reviewing the exercise submission
    When Approver B attempts to begin a review of the same exercise submission approver A is currently reviewing
    Then Approver B is notified this exercise submission is locked

  @DataLoss
  Scenario: Avoid Exercise Submission Loss - Submission locked and forgot about
    Given The ExerciseTracker is running
    And A user submits a new Exercise with all data filled out
    And An exercise submission reference is stored in the DB
    And Approver A loads the exercise submission references
    And Approver A begins reviewing the exercise submission
    And Approver A closes the webpage forcefully
    And 1 hour passes
    And Approver B loads the exercise submission references
    When Approver B attempts to begin a review of the same exercise submission approver A began reviewing
    Then Approver B receives the exercise detais and is able to review
    And Approval of the exercise by Approver B is successful

  @DataConsistency
  Scenario: Approved With Changes Consistent Data
    Given The ExerciseTracker is running
    And A user submits a new Exercise with all data filled out
    When A Sentrain admin Approves the exercise with modifications
    Then Those changes are reflected in the Exercise entity
    And The returned exercise card has consitent data with the exercise entity
