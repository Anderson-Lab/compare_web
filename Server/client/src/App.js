import React, { Component, useState, useEffect  } from 'react';
import Header from './header'
import Basic from './Basic'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import './App.css';

function simulateRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

function FormSelection() {
  return(
    <Form>
        <FormGroup as={Col} controlId="formGridState">
        <FormLabel>Map to..</FormLabel>
          <FormControl as="select">
          <option>Human</option>
          <option>Mouse</option>
          </FormControl>
        </FormGroup>
    </Form>
  );
}

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var crypto = require('crypto');
  const buf = crypto.randomBytes(15);
console.log(
  `${buf.length} bytes of random data: ${buf.toString('hex')}`);

  useEffect(() => {
    if (isLoading) {
      simulateRequest().then(() => {
        setLoading(false); handleShow();
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);
  
  return (
    <>
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Processing Request…' : 'Click to Process Request'}
    </Button>
    
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Personal File Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>cOMPARe.org/${buf.toString('hex')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class App extends Component {
state = {
    data: null,
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className = 'App'>
      <Header />
      <Basic />
      <div>
        <FormSelection />
      </div>
      <div style={{padding:'5px'}}>
      <LoadingButton />
      </div>
      </div>
    );
  }
}

export default App;