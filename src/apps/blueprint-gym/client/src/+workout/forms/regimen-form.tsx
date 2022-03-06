import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  enumToSelectOptions,
  FitnessDifficulty,
  FitnessDifficultyLookup,
  MuscleSpecificity,
  MuscleSpecificityToLabelLookup,
} from "../../core/models/enums.model";
import { WorkoutLink, WorkoutLookupDto } from "../../core/models/shared.model";
import { WorkoutService } from "../../core/services/workout-service";
import Select from "react-select";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faQuestionCircle,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { RegimenFormView } from "../../core/models/workout.model";
import { RegimenService } from "../../core/services/regimen-service";
import DatePicker from "react-datepicker";
import "../../shared/scss/blueprint-globals/all.scss";

function RegimenForm() {
  const { regimenId } = useParams();
  const [id, set_id] = useState<string | null>();
  const [modifiedOn, set_modifiedOn] = useState<Date | null>();
  const [regimenName, set_regimenName] = useState<string>();
  const [regimenDescription, set_regimenDescription] = useState<string>();
  const [difficulty, set_difficulty] = useState<FitnessDifficulty>();
  const [startDate, set_startDate] = useState<Date>();
  const [endDate, set_endDate] = useState<Date>();
  const [workouts, set_workouts] = useState<WorkoutLink[]>([]);
  const [muscleSpecificity, set_muscleSpecificity] = useState<MuscleSpecificity>(MuscleSpecificity.Focused);

  const [loadedRegimen, set_loadedRegimen] = useState<RegimenFormView>();
  const [workoutookups, set_workoutLookups] = useState<WorkoutLookupDto[]>([]);
  const [nameEditCofirmed, set_nameEditCofirmed] = useState(false);

  useEffect(() => {
    if (regimenId) {
      RegimenService.getRegimenFormView(regimenId).then((res) => {
        set_loadedRegimen(res);
        updateForm(res);
      });
    } else {
    }
    WorkoutService.getAllWorkoutLookups()
      .then((res) => {
        set_workoutLookups(res);
      })
      .catch((err) => alert(`Failed!!! ${err}`));
  }, []);

  const updateForm = (regimen: RegimenFormView) => {
    set_id(regimen.id);
    set_modifiedOn(regimen.modifiedOn);
    set_regimenName(regimen.regimenName);
    set_regimenDescription(regimen.regimenDescription);
    set_difficulty(regimen.difficulty);
    set_startDate(regimen.startDate);
    set_endDate(regimen.endDate);
    set_workouts(regimen.workouts);
    set_muscleSpecificity(regimen.muscleSpecificity);
  };

  const getForm = () =>
    ({
      id,
      modifiedOn,
      regimenName,
      regimenDescription,
      difficulty,
      startDate,
      endDate,
      workouts,
      muscleSpecificity,
    } as RegimenFormView);

  const saveForm = () => {
    console.log(getForm());
    RegimenService.saveRegimen(getForm())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!!!!!!!!!!!");
      });
  };

  const isNewForm = regimenId == null;
  const workoutLookupOptions = workoutookups.map((x) => ({
    value: x,
    label: x.workoutName,
  }));

  return (
    <div className="px-3">
      <h1 className="page-title">{isNewForm ? "New" : "Edit"} Regimen</h1>
      <hr />
      <form className="py-4">
        <div className="container pt-2">
          <div className="form-group text-center">
            <label className="bigger">Regimen Name</label>
            <input
              className="form-control w-75 mx-auto text-center"
              readOnly={!isNewForm && !nameEditCofirmed}
              type="text"
              id="regimenName"
              name="regimenName"
              value={regimenName}
              onChange={(e) => set_regimenName(e.target.value)}
            />
          </div>
          <div className="mt-3 pt-2 pb-3">
            <div className="d-flex align-items-center">
              <div className="flex-fill form-group text-center">
                <DatePicker
                  className="datepicker border w-75"
                  selected={startDate}
                  onChange={(date: Date) => set_startDate(date)}
                />
                <label>Start Date</label>
              </div>
              <div>
                <h1 className="text-primary">
                  <FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon>
                </h1>
              </div>
              <div className="flex-fill form-group text-center">
                <DatePicker
                  className="datepicker border w-75"
                  selected={endDate}
                  onChange={(date: Date) => set_endDate(date)}
                />
                <label>End Date</label>
              </div>
            </div>
          </div>

          <hr className="dim-hr" />

          <div className="mt-4 form-group">
            <label>
              Brief Description of Regimen{" "}
              <strong>
                <em>(Optional)</em>
              </strong>
            </label>
            <textarea
              className="form-control form-control-sm"
              rows={4}
              name="regimenDescription"
              id="regimenDescription"
              value={regimenDescription}
              onChange={(e) => set_regimenDescription(e.target.value)}
            />
          </div>

          <div className="mt-4 row">
            <div className="col-md-6 col-12 form-group">
              <label>
                Select Muscle Specificity for this Regimen{" "}
                <button
                  type="button"
                  onClick={() => alert("More Details Modal Placeholder!!!")}
                  className="px-3 btn nounderline btn btn-link nounderline text-primary"
                >
                  <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
                </button>
              </label>
              <Select
                placeholder="Choose Muscle Specificity..."
                options={enumToSelectOptions<MuscleSpecificity>(MuscleSpecificityToLabelLookup)}
                onChange={(e) => set_difficulty(e?.value)}
              />
            </div>
            <div className="mt-2 col-md-6 col-12 form-group">
              <label>Difficulty</label>
              <Select
                className="mt-1"
                options={enumToSelectOptions<FitnessDifficulty>(FitnessDifficultyLookup)}
                onChange={(e) => set_difficulty(e?.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="container pt-2">
            <h3 className="form-section-title mt-5 ">
              <span className="text-primary">
                <FontAwesomeIcon icon={faTimeline} />
              </span>
              {" Workout Selection"}
            </h3>
            <hr className="form-section-title-underline" />

            <div className="form-group mt-4">
              <Select
                placeholder="Choose a Workout ..."
                options={workoutLookupOptions}
                onChange={(e) => {
                  set_workouts([
                    ...workouts,
                    {
                      workoutId: e?.value?.workoutId,
                      workoutName: e?.value?.workoutName,
                    } as WorkoutLink,
                  ]);
                }}
              />
            </div>
            {/* {exerciseToAdd && exerciseToAdd.exerciseId ? exerciseSelectionPanel : null} */}
          </div>
        </div>

        {/* {exerciseAssignmentsGrid} */}

        <div className="container mt-5">
          <button className="save-btn" type="button" onClick={() => saveForm()}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegimenForm;
