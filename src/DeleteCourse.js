import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteCourse = ({
  showModal,
  toggleModal,
  deleteContact,
  courseTitle,
  courseId,
}) => {
  console.log(courseId);
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Are you sure you want to delete ${courseTitle} course?`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => deleteContact(courseId)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCourse;
