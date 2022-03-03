import "./App.scss";
import Navbar from "./shared/components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./core/constants/routes";
import Homepage from "./+home/homepage";
import ExerciseForm from "./+workout/forms/exercise-form";
import WorkoutForm from "./+workout/forms/workout-form";
import RegimenForm from "./+workout/forms/regimen-form";
import ViewWorkoutEntryPage from "./+workout/view-workout-entry-page";
import WorkoutBulkEntryForm from "./+workout/forms/workout-bulk-entry-form";
import WorkoutActiveEntryForm from "./+workout/forms/workout-active-entry-form";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={AppRoutes.home} element={<Homepage />} />
        <Route path={AppRoutes.editExercise()} element={<ExerciseForm />} />
        <Route path={AppRoutes.editWorkout()} element={<WorkoutForm />} />
        <Route path={AppRoutes.editRegimen()} element={<RegimenForm />} />
        <Route
          path={AppRoutes.workoutEntryPage()}
          element={<ViewWorkoutEntryPage />}
        />
        <Route
          path={AppRoutes.workoutBulkEntry()}
          element={<WorkoutBulkEntryForm />}
        />
        <Route
          path={AppRoutes.workoutActiveEntry()}
          element={<WorkoutActiveEntryForm />}
        />
        <Route path={"/"} element={<h1>Landing Page!!!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
