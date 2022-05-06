import React from 'react';
import './card.css'
import {Container,Row,Col}from 'react-bootstrap';
import {Nav,NavDropdown,Navbar}from 'react-bootstrap';
  
function button(){
    return(
                <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/product-info">Product Info</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default button;

