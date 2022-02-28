export const ROUTE_MAP = {
  home: {
    base: "",
    home: "home",
    login: "login",
    register: "register",
    notFound: "not-found",
    accessDenied: "access-denied",
    landingDashboard: "landing-dashboard",
  },
  exerciseSubmission: {
    base: "exercise-submission",
    newExercise: "new-exercise",
  },
  milestoneSubmission: {
    base: "milestone-submission",
    newMilestone: "new-milestone",
  },
  training: {
    base: "training",
    dashboard: "dashboard",
    exerciseDetails: "exercise-details/:id",
  },
  challengeCreation: {
    base: "challenge-create",
    newChallenge: "new-challenge",
  },
  challengeDashboard: {
    base: "challenge-dashboard",
    dashboard: ":id",
  },
  connections: {
    base: "connections",
  },
  user: {
    base: "user",
    dashboard: "dashboard",
    accountProfile: "account-profile/:id",
  },
  specialPermissions: {
    base: "sp",
  },
  admin: {
    base: "admin",
    themeGallery: "theme-gallery",
    exerciseApprovalList: "exercise-approval",
    exerciseApprovalPage: "exercise-approval/:id",
    milestoneApprovalList: "milestone-approval",
    milestoneApprovalPage: "milestone-approval/:id",
  },
};
