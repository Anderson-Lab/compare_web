import React, { Component } from 'react';
// import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/';
import Header from '../header'

class Instructions extends Component {
state = {
    data: null,
  };
  render() {

    const stepList = [
        {description: 'Upload saved text file (“identifications.txt”), that contains the 275 accessions (with header).', key: 0},
        {description: 'Upload a protein FASTA file that corresponds to the text file species. Or pick from the preloaded options.', key: 1},
        {description: 'If you desire human annotaions, then select human from the target menu.', key: 2},
        {description: 'Then click submit and a csv file will be produced with the desired annotations. Along with the file will be unique URL that can be visited again to access all the files of the query.', key: 3}
      ];

    return (
      <div className="App">
        <Header />
        <h1>How To:</h1>
        <h5>The following steps will help guide you through the process...</h5>
        <div>
            <ol style={{ textAlign: 'left' }}>
                {stepList.map(step => {
                return (<li key={step.key}>{step.description}</li>);
                })}
            </ol>
        </div>
        <h7>*** If you select human as the target then you will get added annotations.</h7>
      </div>
    );
  }
}

export default Instructions;
