import React, { useState, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Courses from './courses';
import Course from './onlycourse';
import db from "./db.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Jumbotron, Table, ButtonToggle } from 'reactstrap';
import CustomNavbar from './navbar';

/* Import all pages */
/*
import 

*/


// Intro
// ========================================

const Intro = () => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Welcome to Code.Hub Dashboard</h1>
        <p className="lead">Manage everything and have fun!</p>
      </Jumbotron>
    </div>
  );
};

// Getting Data from db.json using map() for the stats 
// ========================================

class StatsList extends Component {
  render() {
    return(
        db.stats.map((stats)=> {
          return(
          <Card key={stats.id} style={{ width: "10rem", display: "inline-block"}} >
            <Card.Body >
              <Card.Title>{stats.title}</Card.Title>
              <Card.Text>{stats.amount}</Card.Text>
            </Card.Body>
          </Card>
        )}
    ))
  }
}

// Table of courses
// ========================================

class CoursesTable extends Component {
  render() {
    return (
      <div>Last 5 courses<ButtonToggle className="float-right" color="primary">View All</ButtonToggle>{' '}
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
      {db.courses.map((courses)=> {
        return <div key={courses.id}>
        <Table responsive hover>
      <tbody>
        <tr>
          <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{courses.title}</th>
          <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>Bookable</th>
          <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{courses.price.normal}</th>
          <th style={{ width: "20%", justifyContent: "center", textAlign: "left" }}>{courses.dates.start_date} - {courses.dates.end_date}</th>
          <th><ButtonToggle color="info">View Details</ButtonToggle>{' '}</th>
        </tr>
      </tbody>
    </Table>
        </div>
      })}
    </div>
    )
  }
}

// Page Rendering
// ========================================

const IndexStructure = () => {
  return (
    <Router>
    <React.Fragment>
      <CustomNavbar />
      <Intro />
      <div class="container-fluid">
        <div class="row" style={{ textAlign: "center" }}>
          <div class="col" style={{ textAlign: "center" }}>
            <StatsList />
          </div>
        </div>
        <div class="container-fluid">
          <div class="row" style={{ justifyContent: "center", textAlign: "center" }}>
            <div class="col-12" style={{ textAlign: "left" }}>
            <CoursesTable />
            </div>
          </div>
        </div>
        <hr></hr>
        <Switch>
        <Route path="/courses" exact component={Courses} />
        <Route path="/courses/:id" component={Course} />
        </Switch>
        </div>
    </React.Fragment>
    </Router>
  );
};

ReactDOM.render(<IndexStructure />, document.getElementById("root"));
