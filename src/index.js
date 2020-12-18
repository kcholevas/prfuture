import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Courses from './courses';
import Course from './onlycourse';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from './navbar';
import Dashboard from './dashboard'

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
