import React, { useState, useEffect} from "react";
import {Link } from 'react-router-dom';
import db from "./db.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


function Courses() {

  useEffect(() => {

    fetchItems();

  }, []);

  const [items, setItems] = useState([])

  const fetchItems = async () => {
    const data = await fetch('db.courses');
    console.log(db.courses);
    setItems(db.courses);
  }
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="./db.courses.imagePath" />
        <Card.Body>
          <Card.Title>{db.courses.title}</Card.Title>
          <Card.Text>
            {db.courses.description}
          </Card.Text>
          <Button variant="primary">Details</Button>
        </Card.Body>
      </Card>
      {db.courses.map(courses => (
        <h1 key={courses.id}>
          <Link to={`/courses/${courses.id}`} >{courses.title}</Link>
        </h1>

      ))}
    </div>

  );
}

/*const Course = () => {
    return (
      db.courses.map((courses)=> {
        return(
        <Card key={courses.id} style={{ width: "10rem", display: "inline-block"}} >
          <Card.Body >
            <Card.Title>{courses.id}</Card.Title>
            
          </Card.Body>
        </Card>
      )}
    )

    );
  };
 */
export default Courses;