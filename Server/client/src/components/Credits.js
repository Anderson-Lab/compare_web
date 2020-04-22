import React, { Component } from 'react';
// import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/';
import { Navbar, Nav } from 'react-bootstrap/';
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Header from '../header'

class Credits extends Component {
state = {
    data: null,
  };
  render() {

    var titleStyles = {
        textDecorationLine: 'underline',
        marginTop: '5',
      };

    return (
      <div className="App">
        <Header />
        <h1>Credit Page</h1>
        <h5>This project was made possible with the help of...</h5>
        <h3 style={ titleStyles }>BLAST(Basic Local Alignment Search Tool)</h3>
        <h7>BLAST finds regions of similarity between biological sequences. 
            The program compares nucleotide or protein	sequences to sequence databases and calculates the statistical significance.
        </h7>
        <Nav.Link href="https://blast.ncbi.nlm.nih.gov/Blast.cgi">https://blast.ncbi.nlm.nih.gov/Blast.cgi</Nav.Link>
        
        <h3 style={ titleStyles }>DropzoneJS</h3>
        <h7>DropzoneJS is an open source library that provides drag’n’drop file uploads</h7>
        <Nav.Link href="https://www.dropzonejs.com/">https://www.dropzonejs.com/</Nav.Link>
      </div>
    );
  }
}

export default Credits;
