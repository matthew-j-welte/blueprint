@ChallengeTracker
Feature: Challenge Competition

  Tests the functionality of challenge competitions bet

  @Workflow
  Scenario: Workflow happy path - standard challenge points tally and completion
    Given The ChallengeTracker is running
    And A user begins creating a new challenge
    And The user adds a set of members to a new challenge
      | member         |
      | NickDemarshall |
      | Bob            |
      | Welte          |

    And A user adds a set of exercises to a new challenge
      | exercise | additional_weight | reps_per_point |
      | Push Up  | 0                 | 20             |
      | Push Up  | 30                | 10             |
      | Push Up  | 60                | 5              |
      | Squat    | 0                 | 50             |
      | Squat    | 135               | 15             |
      | Squat    | 215               | 10             |
      | Pull Up  | 0                 | 10             |
      | Pull Up  | 30                | 5              |
      | Pull Up  | 60                | 3              |

    And The user submits the challenge
    And A set of points are tallied through RepTracking by member NickDemarshall
      | exercise | additional_weight | points |
      | Push Up  | 0                 | 1      |
      | Push Up  | 0                 | 1      |
      | Push Up  | 0                 | 2      |
      | Push Up  | 60                | 2      |
      | Push Up  | 60                | 3      |
      | Squat    | 0                 | 3      |
      | Squat    | 0                 | 4      |
      | Squat    | 135               | 4      |
      | Squat    | 215               | 5      |
      | Pull Up  | 0                 | 5      |
      | Pull Up  | 30                | 6      |
      | Pull Up  | 30                | 6      |

    And A set of twice as many points are tallied through RepTracking by member Bob
      | exercise | additional_weight | points |
      | Push Up  | 0                 | 2      |
      | Push Up  | 0                 | 2      |
      | Push Up  | 0                 | 4      |
      | Push Up  | 60                | 4      |
      | Push Up  | 60                | 6      |
      | Squat    | 0                 | 6      |
      | Squat    | 0                 | 8      |
      | Squat    | 135               | 8      |
      | Squat    | 215               | 10     |
      | Pull Up  | 0                 | 10     |
      | Pull Up  | 30                | 12     |
      | Pull Up  | 30                | 12     |

    And A set of three times as many points are tallied through RepTracking by member Welte
      | exercise | additional_weight | points |
      | Push Up  | 0                 | 3      |
      | Push Up  | 0                 | 3      |
      | Push Up  | 0                 | 6      |
      | Push Up  | 60                | 6      |
      | Push Up  | 60                | 9      |
      | Squat    | 0                 | 9      |
      | Squat    | 0                 | 12     |
      | Squat    | 135               | 12     |
      | Squat    | 215               | 15     |
      | Pull Up  | 0                 | 15     |
      | Pull Up  | 30                | 18     |
      | Pull Up  | 30                | 18     |

    When A challenge member navigates to the challenge dashboard
    And A challenge totals refresh occurs
    And The totals calculations for member NickDemarshall are correct
      | exercise | additional_weight | points |
      | Push Up  | 0                 | 4      |
      | Push Up  | 60                | 5      |
      | Squat    | 0                 | 7      |
      | Pull Up  | 0                 | 5      |
      | Pull Up  | 30                | 12     |

    And The totals calculations for member Bob are correct
      | exercise | additional_weight | points |
      | Push Up  | 0                 | 8      |
      | Push Up  | 60                | 10     |
      | Squat    | 0                 | 14     |
      | Pull Up  | 0                 | 10     |
      | Pull Up  | 30                | 24     |

    And The totals calculations for member Welte are correct
      | exercise | additional_weight | points |
      | Push Up  | 0                 | 12     |
      | Push Up  | 60                | 15     |
      | Squat    | 0                 | 21     |
      | Pull Up  | 0                 | 15     |
      | Pull Up  | 30                | 36     |

    And The challenge completes
    Then member Welte is declared the winner
    And member NickDemarshall is definitely not declared the winner because he is a loser
