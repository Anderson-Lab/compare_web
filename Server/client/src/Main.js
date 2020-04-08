import React, { Component, useState, useEffect  } from 'react';
import Header from './header'
import Basic from './Basic'
import UserForm from './components/UserForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import FetchFileInfo from './components/FetchFileInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

class Main extends Component {

   render(){
      return (
         <div>
            <Router>
               <Switch>
                  <Route exact path='/'
                  render={() => <UserForm />} />
                  <Route path='/:fileId'
                  render={() => <FetchFileInfo {...this.props} />} />
               </Switch>
            </Router>
         </div>
      )
   }
}

export default Main;
