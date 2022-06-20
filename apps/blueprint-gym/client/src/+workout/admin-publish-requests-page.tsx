import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PublishRequestStatus,
  PublishRequestStatusToBackgroundColorLookup,
  PublishRequestStatusToBorderColorLookup,
  PublishRequestStatusToColorLookup,
  PublishRequestStatusToLabelLookup,
} from "../core/models/enums.model";
import { ExercisePublishRequestDto } from "../core/models/exercise.model";
import Moment from "moment";
import { AppRoutes } from "../core/constants/routes";
import { ExerciseService } from "../core/services/exercise-service";

export default function AdminPublishRequestsPage() {
  const [pendingPublishRequests, set_pendingPublishRequests] = useState<ExercisePublishRequestDto[]>();
  const [inReviewPublishRequests, set_inReviewPublishRequests] = useState<ExercisePublishRequestDto[]>();

  useEffect(() => {
    ExerciseService.getPublishRequestsForAdminReview("1").then((res) => {
      set_pendingPublishRequests(
        res
          .filter((x) => x.publishRequestStatus === PublishRequestStatus.NotStarted)
          .map((x) => ({ ...x, timeSubmitted: new Date(x.timeSubmitted) }))
      );
      set_inReviewPublishRequests(
        res
          .filter((x) => x.publishRequestStatus === PublishRequestStatus.InReview)
          .map((x) => ({ ...x, timeSubmitted: new Date(x.timeSubmitted) }))
      );
    });
  }, []);

  const generatePublishReqCard = (publishReq: ExercisePublishRequestDto, index: number, datePrompt: string) => {
    const isToday = Moment(publishReq.timeSubmitted).isSame(new Date(), "day");
    return (
      <div key={`${index}`}>
        <li key={publishReq.exerciseId} className="list-group-item mt-3 mx-2 px-0 pt-0">
          <Link
            id={"publish-link-" + publishReq.exerciseId}
            to={AppRoutes.modifyExercise("publish", publishReq.exerciseId)}
            className="text-dark"
          >
            <div className="d-flex justify-content-between pr-2 py-0">
              <div
                className="mt-0 px-4 align-self-start"
                style={{
                  color: PublishRequestStatusToColorLookup.get(publishReq.publishRequestStatus),
                  backgroundColor: PublishRequestStatusToBackgroundColorLookup.get(publishReq.publishRequestStatus),
                  borderRight: `1px solid ${PublishRequestStatusToBorderColorLookup.get(
                    publishReq.publishRequestStatus
                  )}`,
                  borderBottom: `1px solid ${PublishRequestStatusToBorderColorLookup.get(
                    publishReq.publishRequestStatus
                  )}`,
                }}
              >
                <small>{PublishRequestStatusToLabelLookup.get(publishReq.publishRequestStatus)}</small>
              </div>
              <div>
                <h5 className="thin text-primary pt-3 pb-1">{publishReq.exerciseName}</h5>
              </div>
              <div className="px-3 align-self-end">
                <small className="thin">
                  <em>{datePrompt}: </em>
                  {isToday
                    ? `Today, ${Moment(publishReq.timeSubmitted).format("LTS")}`
                    : Moment(publishReq.timeSubmitted).format("LL")}
                </small>
              </div>
            </div>
          </Link>
        </li>
      </div>
    );
  };

  const inReviewPublishRequestListItems = inReviewPublishRequests
    ?.sort((a, b) => b.timeSubmitted.getTime() - a.timeSubmitted.getTime())
    .map((publishReq, index) => generatePublishReqCard(publishReq, index, "Last Modified"));

  const pendingPublishRequestListItems = pendingPublishRequests
    ?.sort((a, b) => a.timeSubmitted.getTime() - b.timeSubmitted.getTime())
    .map((publishReq, index) => generatePublishReqCard(publishReq, index, "Posted"));

  return (
    <div className="container mt-5">
      <div>
        <h2 className="form-section-title text-primary">My Active Reviews</h2>
        <hr className="dim-hr mt-1" />
        <ul className="mt-4 list-group list-group-flush">{inReviewPublishRequestListItems}</ul>
      </div>
      <div className="mt-5">
        <h2 className="form-section-title text-primary">Pending Publish Requests</h2>
        <hr className="dim-hr mt-1" />
        <ul className="mt-4 list-group list-group-flush">{pendingPublishRequestListItems}</ul>
      </div>
    </div>
  );
}
