import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import { API } from "./api";
import axios from "axios";

function Courses() {
  const [courses, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, SetData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const response = await axios.get(`${API}/courses`);
        setItems(response.data);
        setIsLoading(false);
        SetData(true);
      } catch {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const DateFormatter = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };
  
  if (error) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  if (isLoading) {
    return <Spinner animation="border" size="lg" />;
  }

  return data ? (
    <div>
      <br></br>
      <h1>All Courses</h1>
      <Row>
        {courses.map((courses) => (
          <h1 key={courses.id}>
            
               <Col>
                  <Card style={{ width: '20rem', height: '600px', display: "inline-block" }}>
                    <Card.Body style={{fontSize: 20}}>
                      <Card.Title style={{ width: '20rem', height: '20px', display: "inline-block" }}>{courses.title}</Card.Title>
                      <Card.Img variant="top" src={courses.imagePath} />
                      <Card.Text style={{ width: '20rem', height: '50%', display: "inline-block" }}>
                      <br></br>   
                      Price: <b>{courses.price.normal} € </b><br></br><br></br>                   
                      Duration: <b>{courses.duration}</b><br></br><br></br>   
                      Dates: <b>Dates: {`${DateFormatter(courses.dates.start_date)} - ${DateFormatter(courses.dates.end_date)}`}</b><br></br>   
                      </Card.Text>
                      <Button color="info" onClick={event =>  window.location.href=(`/courses/${courses.id}`)}>View Details</Button>{' '}
                    </Card.Body>
                  </Card>
                </Col> 
  
          </h1>
        ))}
      </Row>
    </div>
  ) : (
    <Spinner animation="border" size="lg" />
  );
}

export default Courses;
