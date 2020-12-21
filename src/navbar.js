import React from "react";
import { Navbar, Nav } from "react-bootstrap";


const CustomNavbar = () => {
  return (

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Code.Hub Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/courses">Courses</Nav.Link>
          <Nav.Link href="/AddNewCourse">Add New Course</Nav.Link>
        </Nav>
      </Navbar>
   
  );
};

export default CustomNavbar;
