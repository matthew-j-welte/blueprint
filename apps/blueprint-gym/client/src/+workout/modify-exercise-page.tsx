import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExerciseFormView } from "../core/models/exercise.model";
import { ExerciseService } from "../core/services/exercise-service";
import ExerciseSavedPromptModal from "./components/exercise-saved-prompt-modal";
import ExerciseForm from "./forms/exercise-form";

function ModifyExercisePage() {
  const { action } = useParams<string>();
  const { exerciseId } = useParams<string>();
  const [exercise, set_exercise] = useState<ExerciseFormView>();
  const [formLoaded, set_formLoaded] = useState(false);
  const [modalVisible, set_modalVisible] = useState(false);
  const [savedExerciseId, set_savedExerciseId] = useState<string>();

  useEffect(() => {
    if (!action) {
      return;
    }
    set_formLoaded(false);
    set_modalVisible(false);
    set_savedExerciseId(undefined);

    const exerciseQuery: Promise<ExerciseFormView> =
      action == "publish"
        ? ExerciseService.getExerciseForPublish(exerciseId)
        : action == "pre-publish"
        ? ExerciseService.getExerciseForPrePublish(exerciseId)
        : ExerciseService.getExercise(exerciseId);

    exerciseQuery.then((res) => {
      set_exercise(res);
      set_formLoaded(true);
    });
  }, [action]);

  const onSave = (exercise: ExerciseFormView) => {
    ExerciseService.saveExercise(exercise, action)
      .then((res) => {
        set_savedExerciseId(res.exerciseId);
        set_modalVisible(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!!!!!!!!!!!");
      });
  };

  return (
    <div className="px-3">
      {formLoaded ? (
        <ExerciseForm form={exercise as ExerciseFormView} action={action as string} onSave={onSave}></ExerciseForm>
      ) : (
        <div className="p-5 text-primary text-center">
          <h2>LOADING...</h2>
        </div>
      )}
      {modalVisible && savedExerciseId ? (
        <ExerciseSavedPromptModal
          exerciseId={savedExerciseId}
          formAction={action as string}
          onHide={() => set_modalVisible(false)}
        ></ExerciseSavedPromptModal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ModifyExercisePage;
