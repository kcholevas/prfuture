import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//den xreiazetai pleon to db.json 
import { Table, Button} from 'reactstrap';

// Table of courses
// ========================================
 
function CoursesTable(){

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
        <div>Last 5 courses<Button className="float-right" color="primary">View All</Button>{' '}
            <Table class ="d-flex justify-content-center">
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
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>Bookable</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{courses.price.normal}</th>
                <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{courses.dates.start_date} {courses.dates.end_date}</th>
                <th><Button color="info">View Details</Button>{' '}</th>
            </tr>
            </tbody>
        </Table>
            </div>
            })}
        </div>

    );
}


export default CoursesTable;