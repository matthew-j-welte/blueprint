import { faCheckCircle, faLeftLong, faPlusSquare, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  WorkoutDto,
  WorkoutExerciseAssignment,
  WorkoutFormView,
  WorkoutSetEntry,
} from "../../core/models/workout.model";
import { WorkoutService } from "../../core/services/workout-service";
import SelectablePill from "../../shared/components/selectable-pill/selectable-pill";
import { v4 as uuidv4 } from "uuid";
import "./workout-active-entry-form.scss";
import { WorkoutEntryService } from "../../core/services/workout-entry-service";

function WorkoutActiveEntryForm() {
  const { workoutId } = useParams();
  const [workout, set_workout] = useState<WorkoutDto>();
  const [activeExercise, set_activeExercise] = useState<WorkoutExerciseAssignment>();
  const [activeExerciseIndex, set_activeExerciseIndex] = useState(0);
  const [nextExerciseName, set_nextExerciseName] = useState<string>();
  const [previousExerciseName, set_previousExerciseName] = useState<string>();

  const [activeSet, set_activeSet] = useState<WorkoutSetEntry>();
  const [setEntries, set_setEntries] = useState<WorkoutSetEntry[]>();
  const [activeSetGoal, set_activeSetGoal] = useState<WorkoutSetEntry>();
  const [setEntryGoals, set_setEntryGoals] = useState<WorkoutSetEntry[]>([]);
  const [activeSetHeavyCutoff, set_activeSetHeavyCutoff] = useState<number | null>();
  const [activeSetConditionedCutoff, set_activeSetConditionedCutoff] = useState<number | null>();
  const [activeSetDurableCutoff, set_activeSetDurableCutoff] = useState<number | null>();

  const weightInputRef = useRef<HTMLInputElement>(null);
  const repsInputRef = useRef<HTMLInputElement>(null);
  const workoutEntryId = uuidv4();

  useEffect(() => {
    if (workoutId) {
      WorkoutService.getWorkoutFormView(workoutId).then((res) => {
        loadWorkout(res);
      });
    } else {
    }
  }, []);

  const loadWorkout = (workout: WorkoutFormView) => {
    if (workout) {
      set_workout(workout);
      setActiveExerciseInfo(workout.exerciseAssignments, 0);
    }
  };

  const completeWorkout = () => {
    if (setEntries) {
      WorkoutEntryService.saveWorkoutEntry({
        pointsEarned: setEntries.map((x) => x.reps).reduce((partialSum, a) => (partialSum ?? 0) + (a ?? 0), 0) ?? 0,
        regimenId: workout?.regimenId ?? uuidv4(),
        timeSubmitted: new Date(),
        workoutSetEntries: setEntries,
        workoutSetGoals: setEntryGoals,
        workoutId: workoutId ?? "",
        workoutEntryId: workoutEntryId,
        workoutIndex: null,
      }).then((res) => {
        console.log(res);
      });
    }
  };

  const getNewSet = (exerciseAssignemt: WorkoutExerciseAssignment): WorkoutSetEntry => {
    return {
      entryId: uuidv4(),
      setIdentifier: exerciseAssignemt.setIdentifier,
      reps: 0,
      weight: 0,
    };
  };

  const setActiveExerciseInfo = (exercises: WorkoutExerciseAssignment[], index: number) => {
    const exerciseCount = exercises.length;
    const currentExercise = exercises[index] ?? undefined;
    if (currentExercise) {
      set_activeExercise(currentExercise);
      set_activeSet(getNewSet(currentExercise));
    }

    const _nextExerciseIndex = index + 1 === exerciseCount ? 0 : index + 1;
    const nextExercise = exercises[_nextExerciseIndex] ?? undefined;
    if (nextExercise) {
      set_nextExerciseName(nextExercise.exerciseName);
    }

    const _previousExerciseIndex = index - 1 < 0 ? exerciseCount - 1 : index - 1;
    const previousExercise = exercises[_previousExerciseIndex] ?? undefined;
    if (previousExercise) {
      set_previousExerciseName(previousExercise.exerciseName);
    }

    set_activeExerciseIndex(index);
  };

  const loadActiveExercise = (direction: "increment" | "decrement") => {
    const exerciseCount = workout?.exerciseAssignments?.length ?? 0;
    let newIndex = activeExerciseIndex;
    if (direction === "increment") {
      newIndex++;
      if (newIndex >= exerciseCount) {
        newIndex = 0;
      }
    } else {
      newIndex--;
      if (newIndex < 0) {
        newIndex = exerciseCount - 1;
      }
    }

    const newActiveExercise = workout?.exerciseAssignments[newIndex] ?? undefined;
    if (newActiveExercise) {
      setActiveExerciseInfo(workout?.exerciseAssignments ?? [], newIndex);
      // set_activeSetHeavyCutoff(newActiveExercise.heavyAim);
      // set_activeSetConditionedCutoff(newActiveExercise.conditionedAim);
      // set_activeSetDurableCutoff(newActiveExercise.durableAim);
    }
  };

  const exerciseSetPills = setEntries
    ?.filter((x) => activeExercise?.setIdentifier === x.setIdentifier)
    ?.map((entry) => {
      const content = (
        <div className="d-flex align-items-center justify-content-between">
          <div className="mx-1">{entry.weight ?? "N/A"}</div>
          <div className="mx-2">|</div>
          <div className="mx-1">{entry.reps ?? "N/A"}</div>
        </div>
      );

      return (
        <div key={uuidv4()} className="mx-2 p-2">
          <SelectablePill content={content} selected={false} key={entry.entryId} classNames="py-1 px-2" />
        </div>
      );
    });

  return (
    <div>
      <div className="px-3">
        <h1 className="page-title">Active Set Entry</h1>
      </div>
      <div id="exerciseSetPillsPanel" className="container-fluid">
        <hr className="flex-fill dim-hr" />
        <div className="d-flex align-items-center flex-wrap pt-2 previous-sets-panel">{exerciseSetPills}</div>
        <div className="d-flex align-items-center">
          <hr className="w-5 dim-hr" />
          <div className="text-center px-3">
            <h6 className="text-primary">Previous Sets</h6>
          </div>
          <hr className="flex-fill dim-hr" />
        </div>
      </div>

      <div id="workoutEntryPanel" className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <h2
            role="button"
            onClick={() => loadActiveExercise("decrement")}
            className="thin text-secondary mx-2 see-through-50"
          >
            {previousExerciseName}
          </h2>
          <h6 className="mx-5">
            <FontAwesomeIcon icon={faLeftLong} />
          </h6>
          <h1 className="mx-2 thin text-primary">{activeExercise?.exerciseName}</h1>
          <h6 className="mx-5">
            <FontAwesomeIcon icon={faRightLong} />
          </h6>
          <h2
            role="button"
            onClick={() => loadActiveExercise("increment")}
            className="thin text-secondary mx-2 see-through-50"
          >
            {nextExerciseName}
          </h2>
        </div>
        <div className="d-flex justify-content-around mt-5">
          <div className="text-center">
            <label>Goal Weight</label>
            <p className="my-1">
              {activeSetHeavyCutoff} <em className="unit-label">lbs</em>
            </p>
          </div>
          <div className="text-center">
            <label>Goal Sets</label>
            <p className="my-1">
              {activeSetDurableCutoff} <em className="unit-label">sets</em>
            </p>
          </div>
          <div className="text-center">
            <label>Goal Reps</label>
            <p className="my-1">
              {activeSetConditionedCutoff} <em className="unit-label">reps</em>
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-4 pt-3">
          <div className="text-center">
            <input
              ref={weightInputRef}
              className="form-control text-center ml-1 number-input-without-arrows tall-input"
              placeholder=""
              type="number"
              id="weight"
              name="weight"
              value={activeSet?.weight}
              onChange={(e) => set_activeSet({ ...activeSet, weight: +e.target.value } as WorkoutSetEntry)}
            />
            <label className="mt-2 text-center unit-label">lbs</label>
          </div>
          <div className="text-center">
            <input
              className="form-control text-center ml-1 number-input-without-arrows tall-input"
              placeholder=""
              ref={repsInputRef}
              type="number"
              id="reps"
              name="reps"
              value={activeSet?.reps}
              onChange={(e) => set_activeSet({ ...activeSet, reps: +e.target.value } as WorkoutSetEntry)}
            />
            <label className="mt-2 text-center unit-label">reps</label>
          </div>
        </div>
        <div className="d-flex justify-content-center neg-mt-20px">
          <button
            type="button"
            onClick={() => {
              if (activeSet) {
                set_setEntries(setEntries ? [...setEntries, activeSet] : [activeSet]);
              }
              if (activeSet?.weight) {
                weightInputRef.current?.focus();
              } else {
                repsInputRef.current?.focus();
              }
            }}
            className="btn btn-link text-secondary text-72"
          >
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
        <hr className="dim-hr" />
      </div>

      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <div className="mx-1">
            <button className="btn-sm btn-primary px-2" type="button" onClick={() => null}>
              Cancel Workout
            </button>
          </div>
          <div className="mx-2">
            <button type="button" className="save-btn wide-btn mx-2" onClick={() => completeWorkout()}>
              <FontAwesomeIcon icon={faCheckCircle} /> Complete Workout
            </button>
          </div>
          <div className="mx-1">
            <button className="btn-sm btn-primary px-4" type="button" onClick={() => null}>
              Bulk Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutActiveEntryForm;
