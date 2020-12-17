import React, { useState, useEffect, Component } from "react";
import ReactDOM from "react-dom";

import { Route, useParams } from "react-router-dom";
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
import {API} from './api';
const Course = ({match}) => {
  
  const checkBookable = (props) => {
    if (props.open) {
      return;
    } else {
      return;
    }
  };
//tsevdos code
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

  return (
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
        <Button variant="primary">Edit</Button>{" "}
        <Button variant="danger">Delete</Button>{" "}
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

