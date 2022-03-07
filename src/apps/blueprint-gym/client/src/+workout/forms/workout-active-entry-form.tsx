import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkoutDto, WorkoutExerciseAssignment, WorkoutSetFormView } from "../../core/models/workout.model";
import { WorkoutService } from "../../core/services/workout-service";
import SelectablePill from "../../shared/components/selectable-pill/selectable-pill";
import { v4 as uuidv4 } from "uuid";
import './workout-active-entry-form.scss';

function WorkoutActiveEntryForm() {
  const { workoutId } = useParams();
  const [activeSet, set_activeSet] = useState<WorkoutSetFormView>();
  const [setEntries, set_setEntries] = useState<WorkoutSetFormView[]>();
  const [workout, set_workout] = useState<WorkoutDto>();
  const [activeExercise, set_activeExercise] = useState<WorkoutExerciseAssignment>();
  const [activeExerciseIndex, set_activeExerciseIndex] = useState(0);

  useEffect(() => {
    if (workoutId) {
      console.log(workoutId);
      WorkoutService.getWorkoutFormView(workoutId).then((res) => {
        if (res) {
          set_workout(res);
          const firstExercise = res.exerciseAssignments[0] ?? undefined;
          if (firstExercise) {
            set_activeExercise(firstExercise);
            set_activeSet(newSetInit(firstExercise));
          }
        }
      });
    } else {
    }
  }, []);

  const completeWorkout = () => {};

  const newSetInit = (exerciseAssignemt: WorkoutExerciseAssignment): WorkoutSetFormView => {
    return {
      ...exerciseAssignemt,
      workoutId: workoutId as string,
      entryId: uuidv4(),
      workoutEntryId: uuidv4()
    };
  };

  const exerciseSetPills = setEntries?.filter(x => activeExercise?.setIdentifier === x.setIdentifier)?.map((entry) => {
    const content = <div className="d-flex align-items-center justify-content-between">
      <div className="mx-1">
        {(entry.weight ?? "N/A")}
      </div>
      <div className="mx-2">
        |
      </div>
      <div className="mx-1">
        {entry.reps ?? "N/A"}
      </div>
    </div>
    
    return (
      <div className="mx-2 p-2">
        <SelectablePill
          content={content}
          selected={false}
          key={entry.entryId}
          classNames="py-1 px-2"
        />
      </div>
    );
  });

  return (
    <div>
      <div id="exerciseSetPillsPanel" className="container-fluid">
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
        <div className="d-flex justify-content-center">
          <h1 className="thin text-primary">{activeExercise?.exerciseName}</h1>
        </div>
        <div className="d-flex justify-content-around mt-4">
          <div className="text-center">
            <input
              className="form-control text-center ml-1 number-input-without-arrows tall-input"
              placeholder="Enter Weight..."
              type="number"
              id="weight"
              name="weight"
              value={activeSet?.weight}
              onChange={(e) => set_activeSet({ ...activeSet, weight: +e.target.value } as WorkoutSetFormView)}
            />
            <label className="mt-2 text-center unit-label">lbs</label>
          </div>
          <div className="text-center">
            <input
              className="form-control text-center ml-1 number-input-without-arrows tall-input"
              placeholder="Enter Reps..."
              type="number"
              id="reps"
              name="reps"
              value={activeSet?.reps}
              onChange={(e) => set_activeSet({ ...activeSet, reps: +e.target.value } as WorkoutSetFormView)}
            />
            <label className="mt-2 text-center unit-label">reps</label>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="button"
            onClick={() => (activeSet ? set_setEntries(setEntries ? [...setEntries, activeSet] : [activeSet]) : null)}
            className="btn btn-secondary px-5 tall-input"
          >
            Complete Set
          </button>
        </div>
        <hr className="dim-hr" />
        <div className="d-flex justify-content-around mt-4">
          <div className="text-center">
            <label>Goal Weight</label>
            <p className="my-1">
              {activeSet?.heavyAim.aimBonusCutoff} <em className="unit-label">lbs</em>
            </p>
          </div>
          <div className="text-center">
            <label>Goal Reps</label>
            <p className="my-1">
              {activeSet?.conditionedAim.aimBonusCutoff} <em className="unit-label">reps</em>
            </p>
          </div>
          <div className="text-center px-1">
            <label>Goal Sets</label>
            <p className="my-1">
              {activeSet?.durableAim.aimBonusCutoff} <em className="unit-label">sets</em>
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button className="btn-sm btn-primary px-2" type="button" onClick={() => null}>
              Cancel Workout
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn-sm btn-primary"
              onClick={() => {
                const exerciseCount = workout?.exerciseAssignments?.length ?? 0;
                let newIndex = activeExerciseIndex - 1;
                if (newIndex < 0) {
                  newIndex = exerciseCount - 1;
                }

                const newActiveExercise = workout?.exerciseAssignments[newIndex] ?? undefined;
                if (newActiveExercise) {
                  set_activeExercise(newActiveExercise);
                  set_activeSet(newSetInit(newActiveExercise));
                }
              }}
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} /> Prev
            </button>
            <button type="button" className="save-btn mx-2" onClick={() => completeWorkout()}>
              Complete Workout
            </button>
            <button
              type="button"
              className="btn-sm btn-primary"
              onClick={() => {
                const exerciseCount = workout?.exerciseAssignments?.length ?? 0;
                let newIndex = activeExerciseIndex + 1;
                if (newIndex >= exerciseCount) {
                  newIndex = 0;
                }

                const newActiveExercise = workout?.exerciseAssignments[newIndex] ?? undefined;
                if (newActiveExercise) {
                  set_activeExercise({...newActiveExercise});
                  set_activeSet(newSetInit(newActiveExercise));
                }
              }}
            >
              Next <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
          <div>
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
