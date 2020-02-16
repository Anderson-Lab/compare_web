import React, { Component } from 'react';
import logo from './nist.png';

class Header extends Component {
state = {
    data: null,
  };
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} alt="NIST logo"/>
          <h1 className="App-title">Welcome to cOMPARe</h1>
        </header>
        {/* <p className="App-intro"></p> */}
      </div>
    );
  }
}

export default Header;
