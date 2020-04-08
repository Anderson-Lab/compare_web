import React, { Component } from 'react';
import axios from 'axios';
import Header from '../header'
import Dropzone from 'react-dropzone';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/';
import Col from 'react-bootstrap/Col';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from "react-router-dom";
import FetchFileInfo from './FetchFileInfo';

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

class UserFormPreviousVersion extends Component {
   constructor(props) {
         super(props);

         this.onFileChange = this.onFileChange.bind(this);
         this.onFileChange2 = this.onFileChange2.bind(this);
         this.onSubmit = this.onSubmit.bind(this);

         this.state = {
             selectedFile: '',
             selectedFile2: '',
             submitted: false,
             uniqueURL: ""
         }
      }

     onFileChange(e) {
        console.log(e.target.files[0]);
        console.log(e.target.files);
        this.setState({ selectedFile: e.target.files })
     }

     onFileChange2(e) {
        console.log(e.target.files);
        this.setState({ selectedFile2: e.target.files })
     }

     onSubmit(e) {
         e.preventDefault()
         console.log(this.state.selectedFile.length)
         console.log(this.state.selectedFile2.length)
         var formData = new FormData();
         const tempDate = new Date();
         const uniqueVal1 = tempDate.getFullYear() + '' + (tempDate.getMonth()+1) + '' + tempDate.getDate() +''+ tempDate.getHours()+''+ tempDate.getMinutes()+''+ tempDate.getSeconds() +''+tempDate.getMilliseconds();
         for (const key of Object.keys(this.state.selectedFile)) {
             formData.append('selectedFile', this.state.selectedFile[key], uniqueVal1)
         }
         const tempDate2 = new Date();
         const uniqueVal2 = tempDate2.getFullYear() + '' + (tempDate2.getMonth()+1) + '' + tempDate2.getDate() +''+ tempDate2.getHours()+''+ tempDate2.getMinutes()+''+ tempDate2.getSeconds() +''+tempDate2.getMilliseconds();
         for (const key of Object.keys(this.state.selectedFile2)) {
             formData.append('selectedFile', this.state.selectedFile2[key], uniqueVal2)
         }
         if(this.state.selectedFile.length > 0 && this.state.selectedFile2.length > 0){
            this.setState({uniqueURL: "/" + uniqueVal1 + uniqueVal2})
         }

         console.log("Axios");
         axios.post("/", formData, {
         }).then(res => {
             console.log(res)
         });

         //cheap way out going to change
         setTimeout(function() { //Start the timer
            this.setState({submitted: true});
         }.bind(this), 1000)

         console.log(this.state);
     }

  render() {
   if (this.state.submitted === true) {
     return (
        <Router>

         <Route path={this.state.uniqueURL}
         render={() => <FetchFileInfo {...this.props} />} />
         <Redirect to={this.state.uniqueURL} />
        </Router>
     )
   }

    const { description, selectedFile } = this.state;
    return (
      <div>
         <Header />
         <div>
           <FormSelection />
         </div>
         <form onSubmit={this.onSubmit}>
          <input
             type="file"
             name="selectedFile"
             onChange={this.onFileChange}
          />
          <input
             type="file"
             name="selectedFile"
             onChange={this.onFileChange2}
          />
          <button type="submit">Submit</button>
         </form>
      </div>
    );
  }
}

export default withRouter(UserFormPreviousVersion);
