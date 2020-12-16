import React, { useState, useEffect, Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";


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


  
export default CustomNavbar;