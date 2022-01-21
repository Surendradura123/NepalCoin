import  React, { Component } from 'react';
import { Nav,Navbar,Container } from 'react-bootstrap';
import { Link, NavLink} from 'react-router-dom';

class NavbarComp extends Component {
  render(){
    return (
      <>
        <Navbar bg="primary" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href = '/'>Home </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href='/blocks'> Blocks </Nav.Link>
                <Nav.Link href='/conduct-transaction'>Conduct Transaction</Nav.Link>
                <Nav.Link href='/transaction-pool'> Transaction Pool </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )

  }
}

export default NavbarComp;