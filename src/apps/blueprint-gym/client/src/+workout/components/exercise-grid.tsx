import {
  faArrowDown91,
  faHand,
  faLayerGroup,
  faShuffle,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WorkoutExerciseAssignment } from "../../core/models/workout.model";
import "../../shared/scss/blueprint-globals/all.scss";

export interface ExerciseGridInput {
  exercises: WorkoutExerciseAssignment[];
  exercisesSetter: (exercises: WorkoutExerciseAssignment[]) => any;
}

function ExerciseGrid(props: ExerciseGridInput) {
  return (
    <div className="container mt-4 pt-4">
      <div className="d-flex justify-content-around">
        <button className="nounderline btn btn-link text-secondary small">
          <FontAwesomeIcon icon={faWaveSquare}></FontAwesomeIcon> Weave Mode
        </button>
        <button className="nounderline btn btn-link text-secondary small">
          <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon> CrossFit Mode
        </button>
        <button className="nounderline btn btn-link text-secondary small">
          <FontAwesomeIcon icon={faArrowDown91}></FontAwesomeIcon> Countdown
          Mode
        </button>
      </div>
      <div className="py-4">
        <div className="row text-primary table-row-header rounded py-0 mt-2">
          <div className="col-6 text-center border pt-2">
            <h5>Exercise</h5>
          </div>
          <div className="col-2 text-center border pt-2">
            <h5>Aim Weight</h5>
          </div>
          <div className="col-2 text-center border pt-2">
            <h5>Aim Reps</h5>
          </div>
          <div className="col-2 text-center border pt-2">
            <h5>Aim Sets</h5>
          </div>
        </div>
        {props.exercises.map((x) => {
          return (
            <div>
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <button
                    type="button"
                    onClick={() =>
                      props.exercisesSetter(
                        props.exercises.filter(
                          (y) => x.exerciseId !== y.exerciseId
                        )
                      )
                    }
                    className="btn btn-link text-danger nounderline"
                  >
                    {" "}
                    X{" "}
                  </button>
                  <h6 className="less-thin mb-0">{x.exerciseName}</h6>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <h6 className="mb-0 thin">{x.heavyAim?.aimBonusCutoff}</h6>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <h6 className="mb-0 thin">
                    {x.conditionedAim?.aimBonusCutoff}
                  </h6>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <h6 className="mb-0 thin">{x.durableAim?.aimBonusCutoff}</h6>
                </div>
              </div>
              <hr className="dim-hr my-1" />
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-around mt-2">
        <button className="nounderline btn btn-link text-secondary small">
          <FontAwesomeIcon icon={faHand}></FontAwesomeIcon> Insert Break
        </button>
        <button className="nounderline btn btn-link text-secondary small">
          <FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon> Shuffle Exercises
        </button>
      </div>
    </div>
  );
}

export default ExerciseGrid;
