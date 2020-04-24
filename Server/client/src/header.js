import React, { Component } from 'react';
// import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/';
import { Navbar, Nav } from 'react-bootstrap/';
import { NavLink } from 'react-router-dom'
import logo from './MasterBlaster.png';
import { Link } from 'react-router-dom';
import Credits from './components/Credits';

class Header extends Component {
state = {
    data: null,
  };
  render() {
    return (
      <div className="App">
        <header>
        <Navbar bg="primary" variant="dark">
          {/* <Link to="/home">Home</Link> */}
          <Navbar.Brand href="/">MasterBLASTer</Navbar.Brand>
          <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/components/Instructions">Instructions</Nav.Link>
              <Nav.Link as={Link} to="/components/Credits">Credits</Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form> */}
        </Navbar>
        </header>
        {/* <p className="App-intro"></p> */}
      </div>
    );
  }
}

export default Header;
