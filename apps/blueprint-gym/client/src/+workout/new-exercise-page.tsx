import { useEffect, useState } from "react";
import { ExerciseFormView } from "../core/models/exercise.model";
import { ExerciseService } from "../core/services/exercise-service";
import ExerciseSavedPromptModal from "./components/exercise-saved-prompt-modal";
import ExerciseForm from "./forms/exercise-form";

function NewExercisePage() {
  const [exercise, set_exercise] = useState<ExerciseFormView>();
  const [formLoaded, set_formLoaded] = useState(false);
  const [modalVisible, set_modalVisible] = useState(false);
  const [savedExerciseId, set_savedExerciseId] = useState<string>();
  const [addAnother, set_addAnother] = useState(false);

  useEffect(() => {
    set_formLoaded(false);
    set_modalVisible(false);
    set_addAnother(false);
    set_savedExerciseId(undefined);

    ExerciseService.getNewExercise().then((res) => {
      set_exercise(res);
      set_formLoaded(true);
    });
  }, [addAnother]);

  const onSave = (exercise: ExerciseFormView) => {
    ExerciseService.saveExercise(exercise, "new")
      .then((res) => {
        set_savedExerciseId(res.exerciseId);
        set_modalVisible(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!!!!!!!!!!!");
      });
  };

  console.log(modalVisible);
  console.log(savedExerciseId);

  return (
    <div className="px-3">
      {formLoaded ? (
        <ExerciseForm form={exercise as ExerciseFormView} action={"new"} onSave={onSave}></ExerciseForm>
      ) : (
        <div className="p-5 text-primary text-center">
          <h2>LOADING...</h2>
        </div>
      )}
      {modalVisible && savedExerciseId ? (
        <ExerciseSavedPromptModal
          exerciseId={savedExerciseId}
          formAction={"new" as string}
          onAddAnother={() => set_addAnother(true)}
          onHide={() => set_modalVisible(false)}
        ></ExerciseSavedPromptModal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NewExercisePage;
