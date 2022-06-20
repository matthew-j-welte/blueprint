import "./App.scss";
import Navbar from "./shared/components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./core/constants/routes";
import Homepage from "./+home/homepage";
import ViewWorkoutEntryPage from "./+workout/view-workout-entry-page";
import WorkoutBulkEntryForm from "./+workout/forms/workout-bulk-entry-form";
import WorkoutActiveEntryForm from "./+workout/forms/workout-active-entry-form";
import ModifyExercisePage from "./+workout/modify-exercise-page";
import WorkoutResourcesPage from "./+workout/workout-resources-page";
import MyPublishRequestsPage from "./+workout/my-publish-requests-page";
import AdminPublishRequestsPage from "./+workout/admin-publish-requests-page";
import NewExercisePage from "./+workout/new-exercise-page";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={AppRoutes.home()} element={<Homepage />} />
        <Route path={AppRoutes.newExercise()} element={<NewExercisePage />} />
        <Route path={AppRoutes.modifyExercise()} element={<ModifyExercisePage />} />
        <Route path={AppRoutes.workoutResourcesList()} element={<WorkoutResourcesPage />} />

        <Route path={AppRoutes.myPublishRequestsPage()} element={<MyPublishRequestsPage />} />
        <Route path={AppRoutes.adminPublishRequestsPage()} element={<AdminPublishRequestsPage />} />

        {/* <Route path={AppRoutes.newExercise()} element={<ModifyWorkoutPage />} /> */}
        {/* <Route path={AppRoutes.editExercise()} element={<ModifyWorkoutPage />} /> */}
        {/* <Route path={AppRoutes.publishExercise()} element={<ModifyWorkoutPage />} /> */}

        {/* <Route path={AppRoutes.newExercise()} element={<ModifyRegimenPage />} /> */}
        {/* <Route path={AppRoutes.editExercise()} element={<ModifyRegimenPage />} /> */}
        {/* <Route path={AppRoutes.publishExercise()} element={<ModifyRegimenPage />} /> */}

        <Route path={AppRoutes.workoutEntryPage()} element={<ViewWorkoutEntryPage />} />
        <Route path={AppRoutes.workoutBulkEntry()} element={<WorkoutBulkEntryForm />} />
        <Route path={AppRoutes.workoutActiveEntry()} element={<WorkoutActiveEntryForm />} />
        <Route path={"/"} element={<h1>Landing Page!!!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
