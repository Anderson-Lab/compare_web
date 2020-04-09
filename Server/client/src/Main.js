import React, { Component } from 'react';
import UserForm from './components/UserForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchFileInfo from './components/FetchFileInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
