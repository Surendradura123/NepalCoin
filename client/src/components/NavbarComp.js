import  React, { Component } from 'react';
import { Nav,Navbar,Container } from 'react-bootstrap';
import { Link, NavLink} from 'react-router-dom';

class NavbarComp extends Component {
  render(){
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Home </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/blocks"> Blocks </Nav.Link>
              <Nav.Link as={Link} to="/conduct-transaction"> Conduct Transaction </Nav.Link>
              <Nav.Link as={Link} to="/transaction-pool"> Transaction Pool </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )

  }
}

export default NavbarComp;