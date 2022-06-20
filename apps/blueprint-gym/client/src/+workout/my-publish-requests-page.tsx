import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useParams } from "react-router-dom";
import {
  PublishRequestStatus,
  PublishRequestStatusToBackgroundColorLookup,
  PublishRequestStatusToBorderColorLookup,
  PublishRequestStatusToColorLookup,
  PublishRequestStatusToLabelLookup,
} from "../core/models/enums.model";
import { ExercisePublishRequestDto } from "../core/models/exercise.model";
import Moment from "moment";
import { ExerciseService } from "../core/services/exercise-service";

export default function MyPublishRequestsPage() {
  const { userId } = useParams<string>();
  const [publishRequests, set_publishRequests] = useState<ExercisePublishRequestDto[]>();
  const [modalVisible, set_modalVisible] = useState(false);
  const [visiblePublishRequest, set_visiblePublishRequest] = useState<ExercisePublishRequestDto>();

  useEffect(() => {
    ExerciseService.getMyPublishRequests(userId ?? "").then((res) => {
      set_publishRequests(res);
    });
  }, [userId]);

  let modal = null;

  if (modalVisible) {
    const propertyChanges = Object.entries(visiblePublishRequest?.propertyChanges ?? {}).map(
      ([propertyName, value]) => {
        return (
          <div className="my-2">
            <small>
              <strong>{propertyName}</strong>
            </small>
            <div className="p-2 row">
              <div className="col-6">{value.before}</div>
              <div className="col-6">{value.after}</div>
            </div>
          </div>
        );
      }
    );

    modal = (
      <div id="view-publish-request-modal">
        <Modal size="xl" show={modalVisible} onHide={() => set_modalVisible(false)}>
          <ModalHeader>
            <ModalTitle>
              <h2 className="form-section-title text-primary my-0">
                {visiblePublishRequest?.exerciseName} (Publish Request)
              </h2>
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <h5 className="text-primary thin">Status Justification</h5>
            <div>{visiblePublishRequest?.statusJustification}</div>

            <h5 className="mt-3 text-primary thin">Property Changes</h5>
            <div className="mt-3">{propertyChanges}</div>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-around">
            {/* todo: add "cancel request" or "modify request" */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  let previousStatus: PublishRequestStatus | null = null;
  const publishRequestListItems = publishRequests
    ?.sort((a, b) => b.timeSubmitted.getTime() - a.timeSubmitted.getTime())
    .sort((a, b) => b.publishRequestStatus - a.publishRequestStatus)
    .map((publishReq) => {
      const isToday = Moment(publishReq.timeSubmitted).isSame(new Date(), "day");
      const isNewStatus = previousStatus !== null && previousStatus !== publishReq.publishRequestStatus;
      previousStatus = publishReq.publishRequestStatus;
      return (
        <div>
          {isNewStatus ? <hr className="dim-hr my-4" /> : null}
          <li key={publishReq.exerciseId} className="list-group-item mt-2 mx-2 pt-0 pb-0">
            <div
              role={"button"}
              onClick={() => {
                set_visiblePublishRequest(publishReq);
                set_modalVisible(true);
              }}
            >
              <div className="d-flex justify-content-center pt-0">
                <div
                  className="mt-0 border-top-0 px-4"
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
                  <small className="thin">
                    {PublishRequestStatusToLabelLookup.get(publishReq.publishRequestStatus)}
                  </small>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="thin text-primary">{publishReq.exerciseName}</h5>
                </div>
                <div>
                  <small>
                    {isToday
                      ? `Today, ${Moment(publishReq.timeSubmitted).format("LTS")}`
                      : Moment(publishReq.timeSubmitted).format("LL")}
                  </small>
                </div>
              </div>
            </div>
          </li>
        </div>
      );
    });

  return (
    <div className="container mt-5">
      <h2 className="form-section-title text-primary">My Publish Requests</h2>
      <hr className="dim-hr mt-1" />
      <ul className="mt-4 list-group list-group-flush">{publishRequestListItems}</ul>
      {modalVisible ? modal : null}
    </div>
  );
}
