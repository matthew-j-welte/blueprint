import {
  faBarChart,
  faCalendar,
  faEarth,
  faMagnifyingGlass,
  faPencilAlt,
  faPerson,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DifficultyToColorLookup } from "../core/constants/lookups";
import { AppRoutes, Resource, ResourceOwner } from "../core/constants/routes";
import { ExerciseState, FitnessDifficulty, FitnessDifficultyLookup } from "../core/models/enums.model";
import { ExerciseService } from "../core/services/exercise-service";
import { RegimenService } from "../core/services/regimen-service";
import { WorkoutService } from "../core/services/workout-service";
import { FilterByConfig, FilterConfig, ListFilterService } from "../shared/services/list-filter-service";

type WorkoutResourcesPageParams = {
  owner: ResourceOwner;
  resource: Resource;
};

// TODO: Make an interface to be used by "list components" meaning we want to standardize sorting/filtering etc. by adhering to a set of specific methods, and passing a
// an interface as a geenric type which will be used to auto formulate filters, or accept some infput config that tells the filter/sort what fields to use, and which
// functionality they should each have

const difficultyFilter: FilterByConfig = {
  label: "Difficulty",
  icon: faBarChart,
  key: "difficulty",
  selectType: "append",
  options: [...FitnessDifficultyLookup.values()],
  isVisible: (value: string, activeOptions: Set<string>) => activeOptions.has(value),
};

const filterConfigMap: { [key: string]: FilterConfig } = {
  exercise: {
    idKey: "exerciseId",
    sortByAlphKey: "exerciseName",
    filters: [difficultyFilter],
  },
  workout: {
    idKey: "workoutId",
    sortByAlphKey: "workoutName",
    filters: [difficultyFilter],
  },
  regimen: {
    idKey: "regimenId",
    sortByAlphKey: "regimenName",
    filters: [difficultyFilter],
  },
};

export default function WorkoutResourcesPage() {
  const navigate = useNavigate();
  const { owner, resource } = useParams<WorkoutResourcesPageParams>();
  const [filterSvc, set_filterSvc] = useState<ListFilterService>();
  const [searchbarText, set_searchbarText] = useState<string>();

  useEffect(() => {
    loadResources();
  }, [owner, resource]);

  const loadResources = () => {
    const searchType = owner === "mine" ? ExerciseState.Personal : ExerciseState.Published;
    let resourceQuery;
    if (resource === "exercise") {
      resourceQuery = ExerciseService.getAllExerciseLookups(searchType);
    } else if (resource === "workout") {
      resourceQuery = WorkoutService.getAllWorkoutLookups(searchType);
    } else {
      resourceQuery = RegimenService.getAllRegimenLookups(searchType);
    }

    resourceQuery.then((res) => {
      set_filterSvc(new ListFilterService(res, filterConfigMap[resource as string]));
    });
  };

  const changeResources = (newResourcesType: Resource) => {
    if (resource === newResourcesType) {
      return;
    }
    navigate(AppRoutes.workoutResourcesList(owner as ResourceOwner, newResourcesType));
  };

  const changeOwner = (newOwner: ResourceOwner) => {
    if (owner === newOwner) {
      return;
    }
    navigate(AppRoutes.workoutResourcesList(newOwner, resource as Resource));
  };

  const resourceSearchBar = (
    <input
      className="form-control"
      type="text"
      onChange={(e) => set_searchbarText(e.target.value)}
      value={searchbarText}
    ></input>
  );

  // TODO: Split below into exercise cards / card component

  const deleteResource = (exerciseId: string) => {
    console.log(filterSvc);
    console.log(filterSvc?.removeItem(exerciseId));

    ExerciseService.deleteExercise(exerciseId).then((res) => {
      if (res) {
        set_filterSvc(new ListFilterService(filterSvc?.items ?? [], filterSvc?.filterConfig as FilterConfig));
      }
    });
  };

  const visibleResourceCards = filterSvc
    ?.sortBy("exerciseName")
    .search(searchbarText ?? "")
    .map((x) => (
      <div key={x.exerciseId} className="m-2 border card p-0 pb-1">
        <div className="border-bottom px-2 py-0">
          <p className="my-0" style={{ color: DifficultyToColorLookup[x.difficulty] }}>
            <small>{FitnessDifficultyLookup.get(x?.difficulty as FitnessDifficulty)}</small>
          </p>
        </div>
        <div className="p-3 px-5">
          <h4 className="text-center align-self-center thin">{x.exerciseName}</h4>
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <div
            role="button"
            onClick={() => alert(x.exerciseName)}
            className="px-2 py-1 text-white rounded-circle bg-primary"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <Link
            to={AppRoutes.modifyExercise("edit", x.exerciseId)}
            className="px-2 py-1 text-white rounded-circle bg-info"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
          <div
            role="button"
            onClick={() => deleteResource(x.exerciseId)}
            className="px-2 py-1 text-white rounded-circle bg-danger"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
      </div>
    ));

  // ---------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="p-3">
      <div className="d-flex justify-content-around text-center">
        <div onClick={() => changeOwner("mine")} className="py-3 w-100" role={"button"}>
          <h2 className="thin text-primary">
            <FontAwesomeIcon icon={faPerson}></FontAwesomeIcon> My Resources
          </h2>
        </div>
        <div onClick={() => changeOwner("global")} className="py-3 w-100" role={"button"}>
          <h2 className="thin text-primary">
            Global Resources <FontAwesomeIcon icon={faEarth}></FontAwesomeIcon>
          </h2>
        </div>
      </div>
      <div className="d-flex justify-content-around text-center">
        <div onClick={() => changeResources("exercise")} className="py-3 w-100" role={"button"}>
          <h3 className="thin text-primary">Exercises</h3>
        </div>
        <div onClick={() => changeResources("workout")} className="py-3 w-100" role={"button"}>
          <h3 className="thin text-primary">Workouts</h3>
        </div>
        <div onClick={() => changeResources("regimen")} className="py-3 w-100" role={"button"}>
          <h3 className="thin text-primary">Regimens</h3>
        </div>
      </div>
      <div className="mt-3 container">{resourceSearchBar}</div>
      <div className="mt-5 container d-flex flex-wrap">{visibleResourceCards}</div>
    </div>
  );
}
