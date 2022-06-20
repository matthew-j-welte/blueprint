    Then The user should be able to see the newly created exercise through
      | action                                      |
      | searching by name                           |
      | filtering by labels and scrolling to it     |
      | filtering by muscles and scrolling to it    |
      | filtering by difficulty and scrolling to it |
      | sorting by newly created                    |
    And Upon hover of the exercise card, be able to
      | option |
      | edit   |
      | delete |
      | view   |
    When The user clicks view
    Then The exercise modal loads with all expected information about the exercise
    When The user clicks edit
    And The user changes the field values for
      | input          |
      | difficulty     |
      | description    |
      | exerciseLabels |
      | musclesWorked  |
    And The user clicks update exercise
    Then The exercise is saved with the updated information
    When The user hovers over the exercise in my exercise library
    And The user clicks delete
    And A prompt asks if the user is certain and informing them regimens and workouts using this workout will continue to use it until completion
    And The user confirms the delete
    Then The exercise is deleted from the user's exercise library