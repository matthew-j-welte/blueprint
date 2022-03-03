import { useEffect, useState } from "react";
import { ExerciseLookupDto } from "../../core/models/shared.model";
import {
  ExerciseFormView,
  ExerciseLink,
} from "../../core/models/exercise.model";
import { ExerciseService } from "../../core/services/exercise-service";
import {
  ExerciseState,
  FitnessDifficulty,
  FitnessDifficultyLookup,
  getMapKeys,
} from "../../core/models/enums.model";
import "../../shared/scss/blueprint-globals/all.scss";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AppRoutes } from "../../core/constants/routes";

function ExerciseForm() {
  const { exerciseId } = useParams();
  const [searchParams, set_searchParams] = useSearchParams();
  const [exercise, set_exercise] = useState<ExerciseFormView>();
  const [exerciseLookups, set_exerciseLookups] = useState<ExerciseLookupDto[]>(
    []
  );
  const [nameEditCofirmed, set_nameEditCofirmed] = useState(false);

  // exercise
  const [exerciseName, set_exerciseName] = useState<string>();
  const [description, set_description] = useState<string>();
  const [musclesWorked, set_musclesWorked] = useState<string[]>();
  const [exerciseLabels, set_exerciseLabels] = useState<string[]>();
  const [state, set_state] = useState<ExerciseState>();
  const [difficulty, set_difficulty] = useState<FitnessDifficulty>();
  const [parentVariationExercise, set_parentVariationExercise] =
    useState<ExerciseLink>();

  useEffect(() => {
    if (exerciseId) {
      console.log(exerciseId);
      // ExerciseService.getExerciseFormView(exerciseId).then(res => {
      //   setForm(res);
      // })
    } else {
      console.log("new exercise...");
      set_exercise({} as ExerciseFormView);
    }
  }, []);

  const searchExercise = (text: string) => {
    ExerciseService.searchExerciseLookups(text, ExerciseState.Personal)
      .then((data) => {
        set_exerciseLookups(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const isNewForm = exerciseId == null;
  const editWorkoutLink = (
    <Link to={AppRoutes.editWorkout()}>creating workouts</Link>
  );
  const difficultyOptions = getMapKeys(FitnessDifficultyLookup).map(
    (k: FitnessDifficulty) => (
      <option key={k} onSelect={() => set_difficulty(k)}>
        {FitnessDifficultyLookup.get(k)}
      </option>
    )
  );

  return (
    <div className="px-3">
      <h1 className="page-title">{isNewForm ? "New" : "Edit"} Exercise</h1>
      {isNewForm ? (
        <p className="p-3 page-title-subtext">
          Add an exercise here and use it later when {editWorkoutLink}: where
          you can assign goals, a workout aim and combine them with other
          exercises for a specialized set. If you're confident with this
          exercise and want to share it with the community, you can publish it.
        </p>
      ) : null}
      <hr />
      <form className="container py-4">
        <div className="row">
          <div className="col-md-8 col-12 form-group">
            <label>Exercise Name</label>
            <input
              className="form-control"
              readOnly={!isNewForm && !nameEditCofirmed}
              type="text"
              id="exerciseName"
              value={exerciseName}
              onChange={(e) => set_exerciseName(e.target.value)}
            />
          </div>
          <div className="col-md-4 col-12 form-group">
            <label>Difficulty</label>
            <select
              className="form-control"
              id="difficulty"
              value={difficulty}
              onSelect={(e) => console.log(e)}
            >
              {difficultyOptions}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ExerciseForm;
