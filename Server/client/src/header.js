import React, { Component } from 'react';
// import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/';
import { Navbar, Nav} from 'react-bootstrap/';
import logo from './nist.png';
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
          <Navbar.Brand href="/home">MasterBLASTER</Navbar.Brand>
          <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/features">Features</Nav.Link>
              <Nav.Link href="/credits" component={Credits}>Credits</Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form> */}
        </Navbar>
          <img src={logo} alt="NIST logo"/>
          <h1 className="App-title">MASTER BLASTER</h1>
        </header>
        {/* <p className="App-intro"></p> */}
      </div>
    );
  }
}

export default Header;
