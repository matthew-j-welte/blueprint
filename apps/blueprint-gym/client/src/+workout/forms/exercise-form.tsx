import { useEffect, useState } from "react";
import { ExerciseLookupDto } from "../../core/models/shared.model";
import { ExerciseFormView, ExerciseLink, ExercisePrePublishFormView } from "../../core/models/exercise.model";
import { ExerciseService } from "../../core/services/exercise-service";
import {
  enumToSelectOptions,
  ExerciseState,
  FitnessDifficulty,
  FitnessDifficultyLookup,
  MuscleGroupToLabelMap,
  MuscleSpecificity,
} from "../../core/models/enums.model";
import "../../shared/scss/blueprint-globals/all.scss";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../core/constants/routes";
import { BasicMuscleGroups, ExerciseLabels, FocusedMuscleGroups } from "../../core/constants/workout";
import { faPerson, faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectablePill from "../../shared/components/selectable-pill/selectable-pill";
import Select from "react-select";

export interface ExerciseFormInput {
  form: ExerciseFormView | ExercisePrePublishFormView;
  action: string;
  onSave: (exercise: ExerciseFormView) => void;
}

function ExerciseForm(props: ExerciseFormInput) {
  const [exerciseName, set_exerciseName] = useState<string>("");
  const [difficulty, set_difficulty] = useState<FitnessDifficulty>(FitnessDifficulty.Beginner);
  const [description, set_description] = useState<string>("");
  const [exerciseLabels, set_exerciseLabels] = useState<string[]>([]);
  const [musclesWorked, set_musclesWorked] = useState<string[]>([]);
  const [state, set_state] = useState<ExerciseState>();
  const [parentVariationExercise, set_parentVariationExercise] = useState<ExerciseLink>();

  const [formInput, set_formInput] = useState<ExerciseFormView>();
  const [nameEditCofirmed, set_nameEditCofirmed] = useState(false);
  const [activeMuscleGroupBtn, set_activeMuscleGroupBtn] = useState(MuscleSpecificity.Trainer);
  const [exerciseLookups, set_exerciseLookups] = useState<ExerciseLookupDto[]>([]);

  useEffect(() => {
    set_formInput(props.form);
    updateFormFields(props.form);
  }, []);

  const updateFormFields = (exercise: ExerciseFormView) => {
    set_exerciseName(exercise.exerciseName);
    set_description(exercise.description);
    set_musclesWorked(exercise.musclesWorked);
    set_exerciseLabels(exercise.exerciseLabels);
    set_state(exercise.state);
    set_difficulty(exercise.difficulty);
    set_parentVariationExercise(exercise.parentVariationExercise);
  };

  const getForm = () =>
    ({
      ...props.form,
      exerciseName: exerciseName,
      description: description,
      musclesWorked: musclesWorked,
      exerciseLabels: exerciseLabels,
      state: state,
      difficulty: difficulty,
      parentVariationExercise: parentVariationExercise,
    } as ExerciseFormView);

  const searchExercise = (text: string) => {
    set_exerciseName(text);
    if (text) {
      ExerciseService.searchExerciseLookups(text, ExerciseState.Personal)
        .then((data) => {
          set_exerciseLookups(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const isNewForm = props.action === "new";
  const editWorkoutLink = <Link to={AppRoutes.newWorkout()}>creating workouts</Link>;
  const wereMusclesWorkedAutoModified =
    props.action === "pre-publish" &&
    (props.form as ExercisePrePublishFormView).previousMuscleSpecificity !== MuscleSpecificity.Trainer;

  const createMuscleGroupButton = (key: any, label: string, disabled: boolean) => (
    <button
      id={key}
      disabled={disabled}
      type="button"
      key={key}
      onClick={() => set_activeMuscleGroupBtn(key)}
      className={`flex-fill btn-sm btn-primary-fade btn-nav mx-0 ${activeMuscleGroupBtn === key ? "active" : ""}`}
    >
      {label}
    </button>
  );

  const trainerLevelOnly = props.action === "pre-publish";
  const muscleGroupButtons = [
    createMuscleGroupButton("basic-pane", "Basic", trainerLevelOnly),
    createMuscleGroupButton("focused-pane", "Focused", trainerLevelOnly),
    createMuscleGroupButton("trainer-level-pane", "Trainer Level", false),
  ];

  const musclesWorkedSet = new Set(musclesWorked);
  const exerciseLabelsSet = new Set(exerciseLabels);

  const muscleGroupingComponents = (
    activeMuscleGroupBtn === MuscleSpecificity.Basic ? BasicMuscleGroups : FocusedMuscleGroups
  ).map((muscleGroup) => {
    const selected = musclesWorkedSet?.has(muscleGroup);
    return (
      <div key={muscleGroup} className="mx-3 my-2">
        <SelectablePill
          id={muscleGroup}
          content={muscleGroup}
          classNames={"pt-2 pb-1 px-5"}
          selected={selected}
          key={muscleGroup}
          onSelect={() =>
            set_musclesWorked(musclesWorked && !selected ? [...musclesWorked, muscleGroup] : [muscleGroup])
          }
          onDelete={() => set_musclesWorked(musclesWorked?.filter((x) => x !== muscleGroup))}
        />
      </div>
    );
  });

  const exerciseLabelComponents = ExerciseLabels.map((label) => {
    const selected = exerciseLabelsSet?.has(label);
    return (
      <div key={label} className="mx-3 my-2">
        <SelectablePill
          id={label}
          content={label}
          classNames={"pt-2 pb-1 px-5"}
          selected={selected}
          key={label}
          onSelect={() => set_exerciseLabels(exerciseLabels && !selected ? [...exerciseLabels, label] : [label])}
          onDelete={() => set_exerciseLabels(exerciseLabels?.filter((x) => x !== label))}
        />
      </div>
    );
  });

  const titlePrompt = {
    new: "New Exercise",
    edit: "Modify Exercise",
    "pre-publish": "Pre Publish",
    publish: "Publish Exercise",
  }[props.action];

  const buttonPrompt = {
    new: "Add Exercise",
    edit: "Update Exercise",
    "pre-publish": "Pre Publish",
    publish: "Publish Exercise",
  }[props.action];

  return (
    <div className="px-3">
      <h1 className="page-title">{titlePrompt}</h1>
      {isNewForm ? (
        <p className="p-3 page-title-subtext">
          Add an exercise here and use it later when {editWorkoutLink} - where you can assign goals, a workout aim and
          combine them with other exercises for a specialized set. If you're confident with this exercise and want to
          share it with the community, you can publish it.
        </p>
      ) : null}
      <hr />
      <form className="py-4">
        <div className="container pt-2">
          <h3 className="form-section-title">
            <span className="text-primary">
              <FontAwesomeIcon icon={faSitemap} />
            </span>
            {" Exercise Summary"}
          </h3>
          <hr className="form-section-title-underline" />
          <div className="row">
            <div className="col-md-8 col-12 form-group">
              <label>Exercise Name</label>
              <input
                className="form-control"
                readOnly={!isNewForm && !nameEditCofirmed}
                type="text"
                id="exerciseName"
                name="exerciseName"
                value={exerciseName}
                onChange={(e) => searchExercise(e.target.value)}
              />
            </div>
            <div className="col-md-4 col-12 form-group">
              <label>Difficulty</label>
              <Select
                id="difficulty"
                options={enumToSelectOptions<FitnessDifficulty>(FitnessDifficultyLookup)}
                onChange={(e) => set_difficulty(e?.value)}
              />
            </div>
          </div>

          <div className="mt-4 form-group">
            <label>Exercise Description</label>
            <textarea
              className="form-control form-control-sm"
              rows={4}
              name="description"
              id="description"
              value={description}
              onChange={(e) => set_description(e.target.value)}
            />
          </div>

          <div className="form-group pt-4">
            <label>Exercise Labels</label>
            <div className="px-5 mt-2 d-flex flex-wrap">{exerciseLabelComponents}</div>
            <hr className="dim-hr" />
          </div>
          <p className="mt-2 form-section-subtext">
            <em>
              Assigning labels to an exercise allows you (and others if you decide to publish) to group exercises with
              similar characteristics later, which can help with creating workouts!
            </em>
          </p>
        </div>

        <div className="container pt-2">
          <h3 className="form-section-title mt-5 ">
            <span className="text-primary">
              <FontAwesomeIcon icon={faPerson} />
            </span>
            {" Muscle Selection"}
          </h3>
          <hr className="form-section-title-underline" />
          <div className="form-section-subtext">
            <p className="px-3 pt-3 mb-1">
              When creating an exercise, you can choose between 3 different muscle group specificity levels{" "}
            </p>
            <ul>
              <li>
                <strong>Basic</strong> (6 major muscle groups)
              </li>
              <li>
                <strong>Focused</strong> (expanded muscle areas)
              </li>
              <li>
                <strong>Trainer Level</strong> (specific muscles)
              </li>
            </ul>
          </div>
          <div className="px-5">
            <div className="d-flex mt-4">{muscleGroupButtons}</div>
            <div className="form-group mt-2">
              <label className="mt-2">
                Muscle Specificity:{" "}
                <strong>
                  <em>{MuscleGroupToLabelMap[activeMuscleGroupBtn]}</em>
                </strong>
              </label>
              <div className="selectable-pills-pane">
                <div className="d-flex flex-wrap py-3">{muscleGroupingComponents}</div>
                <hr className="dim-hr" />
              </div>
              {wereMusclesWorkedAutoModified ? (
                <div>
                  <em className="text-danger">*Trainer Level muscle assigment required for publish</em>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="container d-flex justify-content-end mt-5">
          <button id="save-exercise-btn" className="save-btn" type="button" onClick={() => props.onSave(getForm())}>
            {buttonPrompt}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExerciseForm;
