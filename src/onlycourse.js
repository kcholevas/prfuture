import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Course = ({ match }) => {

  const checkBookable = (props) => {
    if (course1.open) {
      return;
    } else {
      return;
    }
  };

  const [course1, setCourse] = useState({});
  const { id } = useParams();

  useEffect(() => {

    const fetchSingleCourse = async (id) => {
      const res = await fetch(`http://localhost:3001/courses/${match.params.id}`)
      const course1 = await res.json(); //pairnei to object sto course1
      console.log(course1);
      setCourse(course1);
    };

    fetchSingleCourse();
  }, []);

  console.log(course1);
  let num = parseInt(course1.id);
  console.log(num);

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

  /* on Save Button Click*/
  const handleSaveChanges = () => {


  };
  const handleDeleteCourse = () => {

  };


  const handleEditBook = () => {

  };
  const handleEditInstr = () => {

  };
  const [courseEdit, setCourseEdit] = useState([]);
  const handleEdit = () => {
    setCourseEdit([...courseEdit,])
  }


  const handleEditDate = () => {

  };
  const handleEditPrice = () => {

  };






  return course1.dates ? (
    <div>
      <Jumbotron fluid className="Jumbotron">
        <Container fluid>
          <h1 className="display-4">
            <b>
              {course1.title}
              {` (${course1.id})`}
            </b>
          </h1>
          <div className="img-container">
            <Image src={course1.imagePath} className="courseImage" />
          </div>
        </Container>
      </Jumbotron>

      <Container fluid>
        <Row>
          <Col>
            <h3 className="left">{`Price: ${course.price.normal}€`}</h3>
          </Col>
          <Col>
            <h3 className="right">{`Duration: ${course1.duration}`}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="left">{`Bookable: ${checkBookable(
              course1.open
            )}`}</h3>
          </Col>
          <Col>
            <h3 className="right">{`Dates: ${DateFormatter(
              course1.dates.start_date
            )} - ${DateFormatter(course1.dates.end_date)}`}</h3>
          </Col>
        </Row>
      </Container>

      <div className="courseDescription">
        <p className="courseInfo">{course1.description}</p>
      </div>

      <div className="buttons">
        <Button variant="primary" onClick={handleShowEdit}>Edit</Button>{" "}
        <Button variant="danger" onClick={handleShowDel}>Delete</Button>{" "}

        <Modal show={showEd} onHide={handleCloseEdit} backdrop="static" animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>{`Edit Course: ${course1.title}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Jumbotron className="editform">
              <Form>
                <Form.Group onChange={handleEdit} controlId="formCourseTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control placeholder={course1.title} />
                </Form.Group>

                <Form.Group onChange={handleEdit} controlId="formCourseDuration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control placeholder={course1.duration} />
                </Form.Group>

                <Form.Group onChange={handleEdit} controlId="formCoursePath">
                  <Form.Label>Image path</Form.Label>
                  <Form.Control placeholder={course1.imagePath} />
                </Form.Group>

                <Form.Check type={`checkbox`} id={`bookable`} label={`Bookable`} onChange={handleEditBook} />

                <hr className="my-2" />
                <h2>Instructors</h2>
                <Form.Check type="checkbox" label="John Tsevdos" name="01" value="01" onChange={handleEditInstr} />
                <Form.Check type="checkbox" label="Yannis Nikolakopoulos" name="02" value="02" onChange={handleEditInstr} />


                <hr className="my-2" />

                <Form.Group onChange={handleEdit} controlId="formCourseDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control placeholder={course1.description} as="textarea" rows={5} />
                </Form.Group>

                <hr className="my-2" />
                <h2>Dates</h2>
                <Form.Group onChange={handleEditDate} controlId="formCourseStartDate">
                  <Form.Label>Start date</Form.Label>
                  <Form.Control placeholder={course1.dates.start_date}/>
                </Form.Group>

                <Form.Group onChange={handleEditDate} controlId="formCourseEndDate">
                  <Form.Label>End date</Form.Label>
                  <Form.Control placeholder={course1.dates.end_date}/>
                </Form.Group>

                <hr className="my-2" />
                <h2>Price</h2>
                <Form.Group onChange={handleEditPrice} controlId="formCourseEarlyBird">
                  <Form.Label>Early Bird</Form.Label>
                  <Form.Control type="number" value={course1.price.normal} />
                </Form.Group>

                <Form.Group onChange={handleEditPrice} controlId="formCourseNormalPrice">
                  <Form.Label>Normal Price</Form.Label>
                  <Form.Control type="number" value={course1.price.early_bird} />
                </Form.Group>

              </Form>
            </Jumbotron>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
          </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>

        <Modal id="deleteModal" show={showDel} onHide={handleCloseDel} backdrop="static" animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>{`Delete Course: ${course1.title}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete course {course1.title} and all of its components?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDel}>
              Close
          </Button>
            <Button variant="danger" onClick={handleDeleteCourse}>
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
  ) : ("Waiting for server to fetch the courses...");
};

export default Course;

