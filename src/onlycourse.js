import React, { useState, useEffect} from "react";
import { Jumbotron } from "reactstrap";
import db from "./db";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./Instructor";
import Instructor from "./Instructor";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from 'react-bootstrap/Modal'

const Course = ({match}) => {
  
  const checkBookable = (props) => {
    if (props.open) {
      return;
    } else {
      return;
    }
  };

  useEffect(() => {

    fetchItem();
    console.log(match.params.id);
    var id= match.params.id; 
    console.log(id);

  },[]);

const [item,setItem] = useState([])
  const fetchItem = async () => {
    const data = await fetch(`/courses/${match.params.id}`);
    console.log(data);
    
    setItem(data);
}

  const course = db.courses[1];
  

  const instructors = db.instructors.filter((instructor) =>
    course.instructors.includes(instructor.id)
  );

  const DateFormatter = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const [showEd, setShowEd] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const handleCloseEdit = () => setShowEd(false);
  const handleShowEdit = () => setShowEd(true);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  return (
    <div>
      <Jumbotron fluid className="Jumbotron">
        <Container fluid>
          <h1 className="display-4">
            <b>
              {course.title}
              {` (${course.id})`}
            </b>
          </h1>
          <div className="img-container">
            <Image src={course.imagePath} className="courseImage" />
          </div>
        </Container>
      </Jumbotron>

      <Container fluid>
        <Row>
          <Col>
            <h3 className="left">{`Price: ${course.price.normal}€`}</h3>
          </Col>
          <Col>
            <h3 className="right">{`Duration: ${course.duration}`}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="left">{`Bookable: ${checkBookable(
              course.open
            )}`}</h3>
          </Col>
          <Col>
            <h3 className="right">{`Dates: ${DateFormatter(
              course.dates.start_date
            )} - ${DateFormatter(course.dates.end_date)}`}</h3>
          </Col>
        </Row>
      </Container>

      <div className="courseDescription">
        <p className="courseInfo">{course.description}</p>
      </div>

      <div className="buttons">
        <Button variant="primary" onClick={handleShowEdit}>Edit</Button>{" "}
        <Button variant="danger" onClick={handleShowDel}>Delete</Button>{" "}

        <Modal id="editModal" show={showEd} onHide={handleCloseEdit} backdrop="static" animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{`Edit Course: ${course.title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal id="deleteModal" show={showDel} onHide={handleCloseDel} backdrop="static" animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{`Delete Course: ${course.title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <p>Are you sure you want to delete course {course.title} and all of its components?</p>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDel}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCloseDel}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      </div>

      <div>
        {instructors.length !== 0 ? (
          instructors.map((instructor) => <Instructor>{instructor}</Instructor>)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Course;

