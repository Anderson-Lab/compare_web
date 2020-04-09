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

function FastaSelection() {
  return(
    <Form>
        <FormGroup as={Col} controlId="formGridState">
        <FormLabel>**Preloaded FASTA files**</FormLabel>
          <FormControl as="select">
            {/* Add list of Fasta file names form database */}
          <option>Narwal</option>
          <option>Mouse</option>
          </FormControl>
        </FormGroup>
    </Form>
  );
}




class UserForm extends Component {
   /*constructor(props) {
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
      }*/

      constructor() {
        super();
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileChange2 = this.onFileChange2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onDrop1 = (files) => {
          console.log(files[0]);
          console.log(this);
          if(this.state.selectedFile == ''){
             this.onFileChange(files);
          }else{
             console.log('error occured with upload');
          }
          console.log(this.state);
          console.log(this.state.selectedFile == '');
        };

        this.onDrop2 = (files) => {
          console.log(files[0]);
          console.log(this);
          if(this.state.selectedFile2 == ''){
             this.onFileChange2(files);
          }else{
             console.log('error occured with upload');
          }
          console.log(this.state);
          console.log(this.state.selectedFile2 == '');
        };
        this.state = {
           selectedFile: [],
           selectedFile2: [],
           submitted: false,
           uniqueURL: ""
        }
      }

     onFileChange(e) {
        console.log(e);
        this.setState({ selectedFile: e })
     }

     onFileChange2(e) {
        console.log(e);
        this.setState({ selectedFile2: e })
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

     var containerWrapper = {
        width: '90%',
        height: '160px',
        //background: 'red',
        margin: '0 auto'
     }

     var containerStyles = {
        // width: '710px',
        width: '50%',
        //minWidth: '710px',
        height: '250px',
        //background: 'red',
        //float: 'left',
        display: 'inline-block',
      };
      var containerStyles2 = {
        // width: '710px',
        width: '50%',
        //minWidth: '710px',
        height: '150px',
        //background: 'green',
        //float: 'left',
        display: 'inline-block',
      };

      var dropboxStyles = {
        // maxWidth: '950px',
        // minWidth: '339px',
        width: '100%',
        height: '250px',
        float: 'left',
        // backgroundColor: `rgb(${rgb})`,
        backgroundColor: '#007bff',
        //display: 'inline-block',
      };

      var dropboxStyles2 = {
        // maxWidth: '950px',
        // minWidth: '339px',
        width: '100%',
        height: '150px',
        float: 'left',
        // backgroundColor: `rgb(${rgb})`,
        backgroundColor: '#007bff',
        //display: 'inline-block',
      };



   if (this.state.submitted === true) {
     return (
        <Router>

         <Route path={this.state.uniqueURL}
         render={() => <FetchFileInfo {...this.props} />} />
         <Redirect to={this.state.uniqueURL} />
        </Router>
     )
   }

   //displays file name and size for first file
   const files1 = this.state.selectedFile.map(file => (
     <li key={file.name}>
      {file.name} - {file.size} bytes
     </li>
   ));

   //displays file name and size for second file
   const files2 = this.state.selectedFile2.map(file => (
     <li key={file.name}>
      {file.name} - {file.size} bytes
     </li>
   ));

    const { description, selectedFile } = this.state;
    return (
      <div>
         <Header />
         <form onSubmit={this.onSubmit} style={containerWrapper}>
         <div>
          <Dropzone onDrop={this.onDrop1} name='txt'>
            {({getRootProps, getInputProps}) => (
              <section className="container" style={containerStyles}>
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} name='selectedFile' onChange={this.onFileChange} />
                  <p style={dropboxStyles}>

                      Drop small txt file here
                      <aside>
                        <h4 style={{textDecorationLine: 'underline', fontSize: 30}}>Files</h4>
                        <ul>{files1}</ul>
                      </aside>
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          <Dropzone onDrop={this.onDrop2} name='fasta'>
            {({getRootProps, getInputProps}) => (
              <section className="container" style={containerStyles2}>
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} name='selectedFile' onChange={this.onFileChange2}/>
                  <p style={dropboxStyles2}>

                      Drop fasta file here
                      <aside>
                        <h4 style={{textDecorationLine: 'underline', fontSize: 30}}>Files</h4>
                        <ul>{files2}</ul>
                      </aside>
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          </div>

          <div style={{ marginLeft: '50%', width: '50%'}}>
        <FastaSelection />
      </div>
      <div>
        <FormSelection />
      </div>

          <button type="submit">Submit</button>
         </form>

      </div>
    );
  }
}

export default withRouter(UserForm);
