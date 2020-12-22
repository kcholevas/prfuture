import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import "./index.css";
import { API } from "./api";


// Table of courses
// ========================================
 
function CoursesTable() {
  const [courses, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const response = await axios.get(`${API}/courses`);
        setItems(response.data);
        setIsLoading(false);
      } catch {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  if (isLoading) {
    return <Spinner animation="border" size="lg" />;
  }

  const DateFormatter = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };
    return (
        <div>Last 5 courses<Button className="float-right" color="primary" onClick={event =>  window.location.href='/courses'}>View All</Button>{' '}
            <Table className ="d-flex justify-content-center">
            <thead>
            <tr>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>Title</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>Bookable</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>Price</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>Date</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>Actions</th>
            </tr>
            </thead>
            
            </Table>
            {courses.map((courses)=> {
            return <div key={courses.id}>
            <Table responsive hover>
            <tbody>
            <tr>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{courses.title}</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}><img className="photo" src={process.env.PUBLIC_URL + '/check.png'} alt="Bookable"/></th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{courses.price.normal}</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{`${DateFormatter(courses.dates.start_date)} - ${DateFormatter(courses.dates.end_date)}`}</th>
                <th><Button color="info" onClick={event =>  window.location.href=(`/courses/${courses.id}`)}>View Details</Button>{' '}</th>
            </tr>
            </tbody>
        </Table>
            </div>
            })}
        </div>

    );
}


export default CoursesTable;
