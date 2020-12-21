import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Jumbotron,
  Image,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Instructor from "./Instructor";
import axios from "axios";
import DeleteCourse from "./DeleteCourse";
//import Spinner1 from "./Spinner"
import { API } from "./api";
import { render } from "@testing-library/react";

const Course = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [course, setCourse] = useState({});
  const [data, SetData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const response = await axios.get(`${API}/courses/${match.params.id}`);
        setCourse(response.data);
        setIsLoading(false);
        SetData(true);
      } catch {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkBookable = (props) => {
    
    if (course.open) {
       return <FcCheckmark /> ; 
    } else {
      return <FcCancel />;
    }
  
  };

  if (error) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  if (isLoading) {
    return <Spinner animation="border" size="lg" />;
  }

  const DateFormatter = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const deleteCourse = (id) => {
    axios.delete(`${API}/courses/${id}`).then((res) => {
      toggleModal();
      window.location.href = `/courses`;
    });
  };

  return data ? (
    <div>
      <Container fluid className="courseContainer">
        <Jumbotron fluid className="Jumbotron">
          <h1 className="display-4">
            <b>
              {course.title}
              {` (${course.id})`}
            </b>
          </h1>
          <div className="img-container">
            <Image src={course.imagePath} className="courseImage" />
          </div>
        </Jumbotron>

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
            <h3 className="left">Bookable: {checkBookable(course.open)}</h3>
          </Col>
          <Col>
            <h3 className="right">{`Dates: ${DateFormatter(
              course.dates.start_date
            )} - ${DateFormatter(course.dates.end_date)}`}</h3>
          </Col>
        </Row>

        <Row className="courseDescription">
          <Col>
            <React.Fragment>{parse(course.description)}</React.Fragment>
          </Col>
        </Row>

        <Row className="buttons">
          <Col>
            <Button variant="primary">Edit</Button>
            <Button variant="danger" onClick={toggleModal}>
              Delete
            </Button>
            <DeleteCourse
              showModal={showModal}
              toggleModal={toggleModal}
              deleteContact={deleteCourse}
              courseTitle={course.title}
              courseId={course.id}
            />
          </Col>
        </Row>

        <Row className="instructors">
          <Col>
            <Instructor>{course.instructors}</Instructor>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <Spinner animation="border" size="lg" />
  );
};

export default Course;
