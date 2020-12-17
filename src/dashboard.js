import React, { useState, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Courses from './courses';
import Course from './onlycourse';
import CoursesTable from './CoursesTable';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Jumbotron, Table, ButtonToggle } from 'reactstrap';
import CustomNavbar from './navbar';
import {API} from './api';


function Dashboard(){

    useEffect(() => {

        fetchStats();

    },[]);

    const [stats,setStats] = useState([])

    const fetchStats = async () => {
      const res = await fetch(`http://localhost:3001/stats`)
      const stats = await res.json(); //oxi mono ta stats genika ola ta data
        console.log(stats);
        setStats(stats);
    }
    
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

// Stats
// ========================================
    class StatsList extends Component {
        render() {
          return(
              stats.map((stats)=> {
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
 
    return (
        <div>
        <Intro />        
        <StatsList />
        <CoursesTable />
        </div>

    );
}


export default Dashboard;