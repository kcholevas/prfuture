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
import Dashboard from './dashboard'
import {API} from './api';
/* Import all pages */
/*
import 

*/

// Page Rendering
// ========================================

const IndexStructure = () => {
  return (
    <Router>
    <React.Fragment>
      <CustomNavbar />
      <div class="container-fluid">
        <div class="row" style={{ textAlign: "center" }}>
          <div class="col" style={{ textAlign: "center" }}>
            <Dashboard />
          </div>
        </div>
        <hr></hr>
        <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/courses" exact component={Courses} />
        <Route path="/courses/:id" component={Course} />
        </Switch>
        </div>
    </React.Fragment>
    </Router>
  );
};

ReactDOM.render(<IndexStructure />, document.getElementById("root"));
