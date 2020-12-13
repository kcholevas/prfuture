import React, { useState, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import db from "./db";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import { Jumbotron, Table, ButtonToggle } from 'reactstrap';
/* Import all pages */
/*
import 

*/



// Navbar
// ========================================

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Code.Hub Dashboard</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/courses">Courses</Nav.Link>
        <Nav.Link href="/addnewcourse">Add New Course</Nav.Link>
      </Nav>
    </Navbar>
  );
};

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
          <Card  style={{ width: "10rem", display: "inline-block"}} >
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
      <Table class="d-flex justify-content-center">
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
        return <div>
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
        
        </div>
    </React.Fragment>
  );
};

ReactDOM.render(<IndexStructure />, document.getElementById("root"));
