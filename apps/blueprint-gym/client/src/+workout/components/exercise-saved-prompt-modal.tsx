import { faListAlt, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../core/constants/routes";

export interface ExerciseSavedPromptModalProps {
  formAction: string;
  onAddAnother?: () => void;
  onHide: () => void;
  exerciseId: string;
}

export default function ExerciseSavedPromptModal(props: ExerciseSavedPromptModalProps) {
  const modalTitle = "Success";
  const modalBody =
    props.formAction === "new" || props.formAction === "edit" ? (
      <p>Your exercise was succesfully saved!</p>
    ) : (
      <div>
        <p>Your publish request was submitted succesfully!</p>
        <p>
          When a user submit an exercise for pre-publish, it will typically take a few days to be either{" "}
          <strong>approved</strong> or <strong>rejected</strong>.
        </p>
        <p className="mb-1">Once approved you will be able to: </p>
        <ul>
          <li>
            View your exercise in the{" "}
            <Link to={AppRoutes.workoutResourcesList("global", "exercise")}>
              list of global exercises with an added instructional video
            </Link>
          </li>
          <li>
            Earn a <em className="text-primary">Blue Score</em> for this exercise and track progress in your{" "}
            <Link to={AppRoutes.home()}>User Stats</Link>
          </li>
          <li>And most importantly, you'll give all other users the opportunity to use this exercise!</li>
        </ul>
        <p className="mt-2 mb-0">
          <em>
            <small>
              <Link id="my-publish-requests-link" to={AppRoutes.myPublishRequestsPage("1")}>
                View all publish requests
              </Link>
            </small>
          </em>
        </p>
      </div>
    );

  const modal = (
    <div id="exercise-saved-prompt-modal">
      <Modal show={true} onHide={() => props.onHide()}>
        <ModalHeader>
          <ModalTitle>{modalTitle}</ModalTitle>
        </ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter className="d-flex justify-content-around">
          {props.formAction === "new" || props.formAction === "edit" ? (
            <div>
              <Link
                id="my-exercises-link"
                to={AppRoutes.workoutResourcesList("mine", "exercise")}
                className="btn-sm btn-primary"
              >
                <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon> My Exercises
              </Link>
              {props.formAction == "new" ? (
                <button
                  id="add-another-link"
                  onClick={() => props.onAddAnother && props.onAddAnother()}
                  className="btn-sm btn-primary"
                >
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Another
                </button>
              ) : null}
            </div>
          ) : null}
        </ModalFooter>
      </Modal>
    </div>
  );

  return modal;
}
