import { useEffect, useState } from "react";
import { ExerciseLookupDto } from "../../core/models/shared.model";
import { ExerciseFormView } from "../../core/models/exercise.model";
import { ExerciseService } from "../../core/services/exercise-service";
import { ExerciseState } from "../../core/models/enums.model";
import "../../shared/scss/blueprint-globals/all.scss";

function ExerciseForm() {
  const [form, setForm] = useState<ExerciseFormView>();
  const [exerciseLookups, setExerciseLookups] = useState<ExerciseLookupDto[]>(
    []
  );

  const searchExercise = (text: string) => {
    ExerciseService.searchExerciseLookups(text, ExerciseState.Personal)
      .then((data) => {
        setExerciseLookups(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return <h1 className="page-title">Add New Exercise</h1>;
}

export default ExerciseForm;
