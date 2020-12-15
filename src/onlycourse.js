import React, { useState, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import db from "./db.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import { Jumbotron, Table, ButtonToggle } from 'reactstrap';

function Course({ match }){

    useEffect(() => {

        fetchItem();
        console.log(match);

    },[]);

    const [item,setItem] = useState([{}])

    const fetchItem = async () => {
        const fetchItem = await fetch("./db.json");
        console.log(fetchItem);
        setItem(db.courses);        
    }
    return (
        <div>
            <h1>Item</h1>
        </div>

    );
}

export default Course;