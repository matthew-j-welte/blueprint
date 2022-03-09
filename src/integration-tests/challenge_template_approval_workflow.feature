@ChallengeTracker
Feature: Challenge Template Approval Workflow

  This contains the workflow needed to bring a challenge template from a draft state to a published state.

  @Workflow
  Scenario: Workflow happy path - valid challenge template is filled out and retained upon approval
    Given The ChallengeTracker is running
    And A user submits a new global challenge template
    And A challenge template submission reference is stored in the DB
    And A challenge template record is stored in the DB
    And There is no challenge template card available
    When A Sentrain admin approves the challenge template
    Then The challenge template submission reference is no longer returned from the submissions query
    And A global challenge template card is made available

  @DataIntegrity
  Scenario: Workflow happy path - valid challenge template is filled out and retained upon approval
    Given The ChallengeTracker is running
    And A user submits a new global challenge template
    When A Sentrain admin approves the challenge template
    Then The returned challenge template model retains all expected data of the initial submission
    And The returned challenge template card has consitent data with the challenge template entity

  @DataConsistency
  Scenario: Avoid approver collision - Approver B cannot review challenge template when approver A is already reviewing
    Given The ChallengeTracker is running
    And A user submits a new challenge template
    And A challenge submission reference is stored in the DB
    And Approver A loads the challenge template submission references
    And Approver B loads the same challenge template submission references
    And Approver A begins reviewing the challenge template submission
    When Approver B attempts to begin a review of the same challenge template submission approver A is currently reviewing
    Then Approver B is notified this challenge template submission is locked

  @DataLoss
  Scenario: Avoid challenge template Submission Loss - Submission locked and forgot about
    Given The ChallengeTracker is running
    And A user submits a new challenge template
    And A challenge template submission reference is stored in the DB
    And Approver A loads the challenge template submission references
    And Approver A begins reviewing the challenge template submission
    And Approver A closes the webpage forcefully
    And 1 hour passes
    And Approver B loads the challenge template submission references
    When Approver B attempts to begin a review of the same challenge template submission approver A began reviewing
    Then Approver B receives the challenge template detais and is able to review
    And Approval of the challenge template by Approver B is successful
