import React, { useState, useEffect, Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";


const CustomNavbar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

      <>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Code.Hub Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/courses">Courses</Nav.Link>
          <Nav.Link href="/addnewcourse" onClick={handleShow}>Add New Course</Nav.Link>
        </Nav>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  };


  
export default CustomNavbar;