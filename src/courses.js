import React, { useState, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
//den xreiazetai pleon to db.json
import Card from "react-bootstrap/Card";
import { Jumbotron, Table, ButtonToggle } from 'reactstrap';
import {API} from './api';

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
            {courses.map(courses => (
                <h1 key={courses.id}>
                <Link to={`/courses/${courses.id}`} >{courses.title}</Link>  
                </h1>

            ))}
        </div>

    );
}


export default Courses;
