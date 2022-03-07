import { useEffect, useState } from "react";
import { ExerciseAimInfo, WorkoutExerciseAssignment, WorkoutFormView } from "../../core/models/workout.model";
import { WorkoutService } from "../../core/services/workout-service";
import {
  enumToSelectOptions,
  FitnessDifficulty,
  FitnessDifficultyLookup,
  ExerciseState,
  ExerciseAim,
} from "../../core/models/enums.model";
import "../../shared/scss/blueprint-globals/all.scss";
import { Link, useParams } from "react-router-dom";
import { AppRoutes } from "../../core/constants/routes";
import { WorkoutLabels } from "../../core/constants/workout";
import { faDumbbell, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectablePill from "../../shared/components/selectable-pill/selectable-pill";
import Select from "react-select";
import { ExerciseService } from "../../core/services/exercise-service";
import { ExerciseLookupDto, WorkoutLink } from "../../core/models/shared.model";
import { ExerciseLink } from "../../core/models/exercise.model";
import ExerciseGrid from "../components/exercise-grid";

export interface ExerciseAimButtonInfo {
  aimLookupKey: string;
  buttonLabel: string;
  aimUnit: string;
  enum: ExerciseAim;
  aimNumber: number | undefined;
  selected: boolean;
  aimNumberSetter: any;
  aimSelectedSetter: any;
}

function WorkoutForm() {
  const { workoutId } = useParams();
  const [id, set_id] = useState<string | null>();
  const [modifiedOn, set_modifiedOn] = useState<Date | null>();
  const [workoutName, set_workoutName] = useState<string>("");
  const [workoutDescription, set_workoutDescription] = useState<string>("");
  const [difficulty, set_difficulty] = useState<FitnessDifficulty>();
  const [exerciseAssignments, set_exerciseAssignments] = useState<WorkoutExerciseAssignment[]>([]);
  const [backupExercises, set_backupExercises] = useState<ExerciseLink[]>();
  const [workoutLabels, set_workoutLabels] = useState<string[]>([]);

  const [loadedWorkout, set_loadedWorkout] = useState<WorkoutFormView>();
  const [nameEditCofirmed, set_nameEditCofirmed] = useState(false);
  const [workoutLinks, set_workoutLinks] = useState<WorkoutLink[]>([]);
  const [exerciseLookups, set_exerciseLookups] = useState<ExerciseLookupDto[]>([]);
  const [exerciseToAdd, set_exerciseToAdd] = useState<WorkoutExerciseAssignment>();
  const [heavyAim, set_heavyAim] = useState<number | undefined>(undefined);
  const [conditionedAim, set_conditionedAim] = useState<number | undefined>(undefined);
  const [durableAim, set_durableAim] = useState<number | undefined>(undefined);
  const [heavyAimSelected, set_heavyAimSelected] = useState(false);
  const [conditionedAimSelected, set_conditionedAimSelected] = useState(false);
  const [durableAimSelected, set_durableAimSelected] = useState(false);

  useEffect(() => {
    if (workoutId) {
      console.log(workoutId);
      WorkoutService.getWorkoutFormView(workoutId).then((res) => {
        set_loadedWorkout(res);
        updateForm(res);
      });
    } else {
    }
    ExerciseService.getAllExerciseLookups(ExerciseState.Personal).then((res) => {
      set_exerciseLookups(res);
    });
  }, []);

  const updateForm = (workout: WorkoutFormView) => {
    set_id(workout.id);
    set_modifiedOn(workout.modifiedOn);
    set_workoutName(workout.workoutName);
    set_workoutDescription(workout.workoutDescription);
    set_exerciseAssignments(workout.exerciseAssignments);
    set_backupExercises(workout.backupExercises);
    set_difficulty(workout.difficulty);
  };

  const getForm = () =>
    ({
      id,
      workoutId,
      modifiedOn,
      workoutName,
      workoutDescription,
      difficulty,
      exerciseAssignments,
      backupExercises,
      workoutLabels,
    } as WorkoutFormView);

  const searchWorkout = (text: string) => {
    set_workoutName(text);
    if (text) {
      WorkoutService.searchWorkoutLinks(text)
        .then((data) => {
          set_workoutLinks(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const saveForm = () => {
    console.log(getForm());
    WorkoutService.saveWorkout(getForm())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!!!!!!!!!!!");
      });
  };

  const isNewForm = workoutId == null;
  const editWorkoutLink = <Link to={AppRoutes.editWorkout()}>creating workouts</Link>;

  const workoutLabelsSet = new Set(workoutLabels);

  const workoutLabelComponents = WorkoutLabels.map((label) => {
    const selected = workoutLabelsSet?.has(label);
    return (
      <div key={label} className="mx-3 my-2">
        <SelectablePill
          content={label}
          selected={selected}
          key={label}
          classNames={"pt-2 pb-1 px-5"}
          onSelect={() => set_workoutLabels(workoutLabels && !selected ? [...workoutLabels, label] : [label])}
          onDelete={() => set_workoutLabels(workoutLabels?.filter((x) => x !== label))}
        />
      </div>
    );
  });

  const addExerciseToWorkout = () => {
    if (exerciseToAdd) {
      exerciseToAdd.heavyAim ??= {
        exerciseAim: ExerciseAim.Heavy,
      } as ExerciseAimInfo;
      exerciseToAdd.conditionedAim ??= {
        exerciseAim: ExerciseAim.Conditioned,
      } as ExerciseAimInfo;
      exerciseToAdd.durableAim ??= {
        exerciseAim: ExerciseAim.Durable,
      } as ExerciseAimInfo;

      if (heavyAim) {
        exerciseToAdd.heavyAim.aimBonusCutoff = heavyAim;
      }
      if (conditionedAim) {
        exerciseToAdd.conditionedAim.aimBonusCutoff = conditionedAim;
      }
      if (durableAim) {
        exerciseToAdd.durableAim.aimBonusCutoff = durableAim;
      }

      set_exerciseAssignments([...exerciseAssignments, exerciseToAdd]);
      set_exerciseToAdd(undefined);
      set_heavyAimSelected(false);
      set_conditionedAimSelected(false);
      set_durableAimSelected(false);
      set_heavyAim(undefined);
      set_conditionedAim(undefined);
      set_durableAim(undefined);
    }
  };

  const exerciseAimButtonInfo: ExerciseAimButtonInfo[] = [
    {
      aimLookupKey: "heavyAim",
      buttonLabel: "Heavy",
      aimUnit: "lbs",
      enum: ExerciseAim.Heavy,
      aimNumber: heavyAim,
      selected: heavyAimSelected,
      aimNumberSetter: set_heavyAim,
      aimSelectedSetter: set_heavyAimSelected,
    },
    {
      aimLookupKey: "conditionedAim",
      buttonLabel: "Conditioned",
      aimUnit: "reps",
      enum: ExerciseAim.Conditioned,
      aimNumber: conditionedAim,
      selected: conditionedAimSelected,
      aimNumberSetter: set_conditionedAim,
      aimSelectedSetter: set_conditionedAimSelected,
    },
    {
      aimLookupKey: "durableAim",
      buttonLabel: "Durable",
      aimUnit: "sets",
      enum: ExerciseAim.Durable,
      aimNumber: durableAim,
      selected: durableAimSelected,
      aimNumberSetter: set_durableAim,
      aimSelectedSetter: set_durableAimSelected,
    },
  ];

  const exerciseAimButtons = exerciseAimButtonInfo.map((x: ExerciseAimButtonInfo) => {
    return (
      <div key={x.enum} className="m-4">
        <div className="d-flex justify-content-center">
          <button
            className={`nounderline btn btn-link text-secondary px-4 ${x.selected ? "active" : ""}`}
            type="button"
            onClick={() => x.aimSelectedSetter(!x.selected)}
          >
            {x.buttonLabel}
          </button>
        </div>
        <div className="text-center mt-2">
          <input
            className="form-control text-center ml-1 number-input-without-arrows"
            type="number"
            disabled={!x.selected}
            id={x.aimLookupKey}
            name={x.aimLookupKey}
            value={x.selected ? x.aimNumber : ""}
            onChange={(e) => x.aimNumberSetter(+e.target.value)}
          />
        </div>
        <div className="mt-2 text-center unit-label"> {x.aimUnit}</div>
      </div>
    );
  });

  const exerciseAssignmentsGrid = (
    <ExerciseGrid
      exercises={exerciseAssignments}
      exercisesSetter={(exercises: WorkoutExerciseAssignment[]) => set_exerciseAssignments(exercises)}
    ></ExerciseGrid>
  );

  const exerciseSelectionPanel = (
    <div className="mt-2 p-3 pb-2 workout-exercise-selection-panel">
      <h4 className="text-primary thin">{exerciseToAdd?.exerciseName}</h4>

      <div className="text-center">
        <label>
          <strong>Assign Aim Bonuses</strong>
          <button
            type="button"
            onClick={() => alert("More Details Modal Placeholder!!!")}
            className="px-3 btn nounderline btn btn-link nounderline text-primary"
          >
            <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
          </button>
        </label>
        <hr className="dim-hr px-5 my-1" />
      </div>

      <div className="mt-3 d-flex justify-content-around flex-wrap">{exerciseAimButtons}</div>

      <div className="d-flex justify-content-center mt-5 pb-2">
        <button onClick={() => addExerciseToWorkout()} className="w-25 px-5 btn btn-primary" type="button">
          Add Exercise
        </button>
      </div>
    </div>
  );

  const exerciseLinkOptions = exerciseLookups.map((x) => ({
    value: x,
    label: x.exerciseName,
  }));

  return (
    <div className="px-3">
      <h1 className="page-title">{isNewForm ? "New" : "Edit"} Workout</h1>
      {isNewForm ? (
        <p className="p-3 page-title-subtext">
          Add a workout here and use it later when {editWorkoutLink} - where you can assign goals, a workout aim and
          combine them with other workouts for a specialized set. If you're confident with this workout and want to
          share it with the community, you can publish it.
        </p>
      ) : null}
      <hr />
      <form className="py-4">
        <div className="container pt-2">
          <div className="row">
            <div className="col-md-8 col-12 form-group">
              <label>Workout Name</label>
              <input
                className="form-control"
                readOnly={!isNewForm && !nameEditCofirmed}
                type="text"
                id="workoutName"
                name="workoutName"
                value={workoutName}
                onChange={(e) => searchWorkout(e.target.value)}
              />
            </div>
            <div className="col-md-4 col-12 form-group">
              <label>Difficulty</label>
              <Select
                options={enumToSelectOptions<FitnessDifficulty>(FitnessDifficultyLookup)}
                onChange={(e) => set_difficulty(e?.value)}
              />
            </div>
          </div>

          <div className="mt-4 form-group">
            <label>Workout Description</label>
            <textarea
              className="form-control form-control-sm"
              rows={4}
              name="description"
              id="description"
              value={workoutDescription}
              onChange={(e) => set_workoutDescription(e.target.value)}
            />
          </div>

          <div className="form-group pt-4">
            <label>Workout Labels</label>
            <div className="px-5 mt-2 d-flex flex-wrap">{workoutLabelComponents}</div>
            <hr className="dim-hr" />
          </div>
          <p className="mt-2 form-section-subtext">
            <em>
              Assigning labels to a workout allows you (and others if you decide to publish) to group workouts with
              similar characteristics later, which can help with creating regimens!
            </em>
          </p>
        </div>

        <div className="container pt-2">
          <h3 className="form-section-title mt-5 ">
            <span className="text-primary">
              <FontAwesomeIcon icon={faDumbbell} />
            </span>
            {" Exercise Selection"}
          </h3>
          <hr className="form-section-title-underline" />

          <div className="form-group mt-4">
            <Select
              placeholder="Choose an exercise "
              options={exerciseLinkOptions}
              onChange={(e) => {
                set_exerciseToAdd({
                  exerciseId: e?.value?.exerciseId,
                  exerciseName: e?.value?.exerciseName,
                  musclesWorked: e?.value?.musclesWorked,
                } as WorkoutExerciseAssignment);
              }}
            />
          </div>
          {exerciseToAdd && exerciseToAdd.exerciseId ? exerciseSelectionPanel : null}
        </div>

        {exerciseAssignmentsGrid}

        <div className="container mt-5">
          <button className="save-btn" type="button" onClick={() => saveForm()}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;
