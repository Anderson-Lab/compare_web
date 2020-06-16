import React, { Component } from 'react';
// import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/';
import { Nav } from 'react-bootstrap/';
import Header from '../header'

class Credits extends Component {
state = {
    data: null,
  };
  render() {

    var titleStyles = {
        textDecorationLine: 'underline',
        marginTop: '5',
        textShadow: '-1px 1px #007bff',
      };

    return (
      <div className="App">
        <Header />
        {/* <h1>Credit Page</h1> */}
        <h5>This project was made possible with the help of...</h5>

        <h3 style={ titleStyles }>Phil Wilmarth, OHSU</h3>
        <h7>Developed PAW_BLAST. A utility for blasting one protein FASTA file (queries) against another (hits) to find orthologs (reciprocal best matches).</h7>
        <Nav.Link href="https://github.com/pwilmart/PAW_BLAST">https://github.com/pwilmart/PAW_BLAST</Nav.Link>
        <Nav.Link href="https://github.com/pwilmart/annotations/blob/master/LICENSE">MIT License</Nav.Link>

        <h3 style={ titleStyles }>Ben Neely, Ph.D.</h3>
        <h7>Research Chemist at the National Institute of Standards and Technology</h7>

        <h3 style={ titleStyles }>Paul Anderson, Ph.D.</h3>
        <h7>Associate Professor, California Polytechnic State University</h7>

        <h3 style={ titleStyles }>Julian Tan</h3>
        <h7>Computer Science Student. California Polytechnic State University, San Luis Obispo</h7>

        <h3 style={ titleStyles }>Salvador Morales</h3>
        <h7>Computer Science Student. California Polytechnic State University, San Luis Obispo</h7>

        <h3 style={ titleStyles }>UniProt</h3>
        <h7>Written by Kyra Patton, OHSU summer research project, 2016. Adds annotations to proteomics results files.</h7>

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
