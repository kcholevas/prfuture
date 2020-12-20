import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
//den xreiazetai pleon to db.json
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';


function Courses(){

    useEffect(() => {

        fetchItems();

    },[]);

    const [courses,setItems] = useState([])

    const fetchItems = async () => {
      const res = await fetch(`http://localhost:3001/courses`)
      const courses = await res.json(); //ta kanei fetch apo ton server!
        console.log(courses);
        setItems(courses);
    }
    
    return (
        <div>
        <br></br>
        <h1>All Courses</h1>
        <Row>
            {courses.map(courses => (
                <h1 key={courses.id}>
                <Link to={`/courses/${courses.id}`} >
                  <Card style={{ width: '18rem', display: "inline-block" }}>
                    <Card.Img variant="top" src={courses.imagePath} />
                    <Card.Body>
                      <Card.Title>{courses.title}</Card.Title>
                      <Card.Text>
                      <h4>Price: {courses.price.normal} €</h4>                      
                      <h4>Duration: {courses.duration}</h4>
                      <h5>Dates: {courses.dates.start_date} - {courses.dates.end_date} </h5>
                      </Card.Text>
                      <Button color="info" onClick={event =>  window.location.href=(`/courses/${courses.id}`)}>View Details</Button>{' '}
                    </Card.Body>
                  </Card>
                </Link>  
                </h1>

            ))}
            </Row>
        </div>

    );
}


export default Courses;