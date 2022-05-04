import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExerciseFormView } from "../core/models/exercise.model";
import { ExerciseService } from "../core/services/exercise-service";
import ExerciseForm from "./forms/exercise-form";

function ModifyExercisePage() {
  const { action, exerciseId } = useParams();
  const [exercise, set_exercise] = useState<ExerciseFormView>();
  const [formAction, set_formAction] = useState<string>("new");
  const [formLoaded, set_formLoaded] = useState(false);

  useEffect(() => {
    set_formLoaded(false);
    set_formAction(action ?? "new");
    ExerciseService.getExercise(exerciseId).then((res) => {
      set_exercise(res);
      set_formLoaded(true);
    });
  }, []);

  const onSave = (exercise: ExerciseFormView) => {
    ExerciseService.saveExercise(exercise, formAction)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!!!!!!!!!!!");
      });
  };

  return (
    <div className="px-3">
      {formLoaded ? (
        <ExerciseForm form={exercise as ExerciseFormView} action={formAction as string} onSave={onSave}></ExerciseForm>
      ) : (
        <div className="p-5 text-primary text-center">
          <h2>LOADING...</h2>
        </div>
      )}
    </div>
  );
}

export default ModifyExercisePage;
