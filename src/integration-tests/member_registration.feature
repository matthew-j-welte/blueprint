@MemberTracker
Feature: Member Registration

    Member Registration is how users will signup for Sentrain

    Scenario: Happy Path - Member registers with a unique name and all fields filled out
        Given The MemberTracker is running
        When A user submits a registration with all data filled out
        Then The member account is succesfully created and returned
        And The User's account picture is uploaded

    Scenario: Account name collision - Member registers with an account name that has already been taken
        Given The MemberTracker is running
        And A user submits a registration with an account name that is already taken
        Then The member account is not created
        And A response is returned detailing the account name collision issue to the user
