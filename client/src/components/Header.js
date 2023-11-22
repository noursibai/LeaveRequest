import React from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg"  className="custom-navbar">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin" className="nav-link-custom">
                ADMIN
              </Nav.Link>
              <Nav.Link as={Link} to="/user" className="nav-link-custom">
                USER
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;