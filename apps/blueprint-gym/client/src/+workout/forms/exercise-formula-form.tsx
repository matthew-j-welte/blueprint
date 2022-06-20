import { useEffect, useState } from "react";
import { ExerciseService } from "../../core/services/exercise-service";
import { ExerciseState } from "../../core/models/enums.model";
import "../../shared/scss/blueprint-globals/all.scss";
import { faPray, faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlueScoreFormula } from "../../core/models/workout.model";

export interface ExerciseFormulaFormInput {
  formula?: BlueScoreFormula | null;
  exerciseName?: string | null;
  saveCallback: (output: ExerciseFormulaFormOutput) => any;
}

export interface ExerciseFormulaFormOutput {
  formula?: BlueScoreFormula | null;
}

declare interface PointExample {
  points: number;
  reps: number;
  repsMultiplier: number;
  weight: number;
  weightMultiplier: number;
}

function ExerciseFormulaForm(props: ExerciseFormulaFormInput) {
  const [formula, set_formula] = useState<BlueScoreFormula | null>();
  const [onePointExample, set_onePointExample] = useState<PointExample | null>();
  const [fivePointExample, set_fivePointExample] = useState<PointExample | null>();
  const [tenPointExample, set_tenPointExample] = useState<PointExample | null>();

  useEffect(() => {
    set_formula(props.formula);
    initPointExamples();
  }, [props.formula]);

  const saveForm = () => {
    props.saveCallback({
      formula: formula,
    });
  };

  const initPointExamples = () => {
    // init all three point examples
    // might make sense to just do a list of point examples that way we can
    // add a button for "see more examples"
  };

  // exercise name
  // description of how this all works
  // select of the list of rep labels/types (reps, minutes etc.)

  return <div className="px-3"></div>;
}

export default ExerciseFormulaForm;
