import React, { Component, useState, useEffect  } from 'react';
import Header from './header'
import Basic from './Basic'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css';

function simulateRequest() {
  var crypto = require('crypto');
  const buf = crypto.randomBytes(15);
console.log(
  `${buf.length} bytes of random data: ${buf.toString('hex')}`);
  return new Promise(resolve => setTimeout(resolve, 2000));
}

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);
  
  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Processing Request…' : 'Click to Process Request'}
    </Button>
  );
}

class ProcessRequest extends Component {
state = {
    data: null,
  };

  render() {
    return (
      <LoadingButton />
    );
  }
}

export default ProcessRequest;
