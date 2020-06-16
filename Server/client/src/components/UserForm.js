import React, {
   Component
} from 'react';
import axios from 'axios';
import Header from '../header'
import Dropzone from 'react-dropzone';
import logo from '../MasterBlaster.png';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap/';
import Col from 'react-bootstrap/Col';
import {
   BrowserRouter as Router,
   Route,
   Redirect,
   withRouter
} from "react-router-dom";
import FetchFileInfo from './FetchFileInfo';


class UserForm extends Component {

   constructor() {
      super();
      this.onFileChange = this.onFileChange.bind(this);
      this.onFileChange2 = this.onFileChange2.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);

      //action of uploading first file
      this.onDrop1 = (files) => {
         let currFileName = files[0].name.split(".");
         let currFileExt = currFileName[currFileName.length - 1];

         //checks if the file was the correct mime type
         if (currFileExt === "txt") {
            this.onFileChange(files);
         } else {
            alert("Incorrect FIle Type, only txt accepted");
         }
      };

      //action of uploading second file
      this.onDrop2 = (files) => {
         let currFileName = files[0].name.split(".");
         let currFileExt = currFileName[currFileName.length - 1];

         //checks if the file was the correct mime type
         if (currFileExt === "fasta") {
            console.log("Correct File Type");
            this.onFileChange2(files);
         } else {
            console.log("Incorrect File Type");
            alert("Incorrect FIle Type, only fastas accepted");
         }
      };

      this.state = {
         selectedFile: [],
         selectedFile2: [],
         targetList: [],
         refseqUsed: false,
         value: '',
         value2: '',
         readyToSubmit: false,
         submitted: false,
         uniqueURL: "",
         refseqlist: [],
         refseqMounted: false,
         targetMounted: false
      }
   }

   //updates state for first dropdown
   handleChange(event) {
      this.setState({value: event.target.value});
   }

   //updates state for second dropdown
   handleChange2(event) {
      this.setState({value2: event.target.value});
   }

   //updates state for first file selection
   onFileChange(e) {
      this.setState({selectedFile: e});
   }

   //updates state for second file selection
   onFileChange2(e) {
      this.setState({selectedFile2: e});
   }

   fetchRefseq() {
      fetch("./refseq.json")
         .then((res) => res.json())
         .then((data) => this.setState({refseqlist: data}));
   }

   fetchTargetList(){
      fetch("./targetList.json")
         .then((res) => res.json())
         .then((data) => this.setState({targetList: data}));
   }

   componentDidMount(e) {
      this.fetchRefseq();
      this.fetchTargetList();
   }

   onSubmit(e) {
      e.preventDefault()

      //Variables
      let file1 = this.state.selectedFile;
      let file2 = this.state.selectedFile2;
      let refseq = this.state.value;
      let target = this.state.value2;

      //where both files are provided and target is selected
      if (file1.length && file2.length && !refseq.length && target.length) {
         var formData = new FormData();
         const tempDate = new Date();
         const uniqueVal1 = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds() + '' + tempDate.getMilliseconds();
         for (const key of Object.keys(file1)) {
            formData.append('selectedFile', file1[key]);
            //passes target
            formData.append('target', this.state.value2);
            //should be false
            formData.append('refseqUsed', this.state.refseqUsed);
            //pass the uniqueId
            formData.append('id', uniqueVal1);
         }
         const tempDate2 = new Date();
         const uniqueVal2 = tempDate2.getFullYear() + '' + (tempDate2.getMonth() + 1) + '' + tempDate2.getDate() + '' + tempDate2.getHours() + '' + tempDate2.getMinutes() + '' + tempDate2.getSeconds() + '' + tempDate2.getMilliseconds();
         for (const key of Object.keys(file2)) {
            formData.append('selectedFile', file2[key])
         }
         if (file1.length > 0 && file2.length > 0) {
            //takes the time submitted of the first file to create unique value
            this.setState({uniqueURL: "/" + uniqueVal1});
         }

         console.log("Axios");
         axios.post("/", formData).then(res => {
            console.log(res);
         }).catch(err =>{
            console.log(err.code);
            console.log(err.message);
            console.log(err.stack);
         });

         //cheap way out going to change
         setTimeout(function() { //Start the timer
            this.setState({submitted: true});
         }.bind(this), 1000)
      } else if (file1.length && !file2.length && refseq.length && target.length) {
         //where second file is selected from drop down and target is selected
         console.log("with selection (must change database to accomidate and add state)");
         this.setState({refseqUsed: true});

         formData = new FormData();
         const tempDate = new Date();
         const uniqueVal1 = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds() + '' + tempDate.getMilliseconds();
         for (const key of Object.keys(file1)) {
            formData.append('selectedFile', file1[key]);
            //this passes the file name from dropdown
            formData.append('refseqName', this.state.value);
            //passes target
            formData.append('target', this.state.value2);
            // value should be true
            formData.append('refseqUsed', this.state.refseqUsed);
            //pass the uniqueId
            formData.append('id', uniqueVal1);
         }

         const tempDate2 = new Date();
         const uniqueVal2 = tempDate2.getFullYear() + '' + (tempDate2.getMonth() + 1) + '' + tempDate2.getDate() + '' + tempDate2.getHours() + '' + tempDate2.getMinutes() + '' + tempDate2.getSeconds() + '' + tempDate2.getMilliseconds();
         for (const key of Object.keys(file2)) {
            formData.append('selectedFile', file2[key])
         }

         if (file1.length > 0 && refseq.length) {
            //takes the time submitted of the first file to create unique value
            this.setState({uniqueURL: "/" + uniqueVal1});
         }

         //Sends formdata to server in order to upload files
         axios.post("/", formData).then(res => {
            console.log(this.state);
         }).catch(err =>{
            console.log(err.code);
            console.log(err.message);
            console.log(err.stack);
         });

         //cheap way out going to change
         setTimeout(function() { //Start the timer
            this.setState({submitted: true});
         }.bind(this), 1000)
      } else if (file1.length && file2.length && refseq.length && target.length) {
         alert("Too many fastas selected, can only have one");
      } else {
         alert("not all files selected");
      }
   }

   render() {
      var containerWrapper = {
         width: '90%',
         height: '160px',
         margin: '0 auto'
      }

      var containerStyles = {
         width: '50%',
         height: '180px',
         display: 'inline-block',
      };

      var dropboxStyles = {
         width: '100%',
         height: '180px',
         float: 'left',
         color: '#ffffff',
         backgroundColor: '#007bff',
         border: '5px solid',
         borderRadius: '15px',
         borderColor: '#007bff'
      };

      var dropBoxTitle = {
         //textDecorationLine: 'underline',
         borderBottom: '2px solid white',
         fontSize: 20,
         color: '#ffffff',
      };



      if (this.state.submitted === true) {
         return (
            <Router>
               <Route path = {this.state.uniqueURL}
               render = {() => <FetchFileInfo {...this.props}/>} />
               <Redirect to = {this.state.uniqueURL}/>
            </Router>
         )
      }

      //displays file name and size for first file
      const files1 = this.state.selectedFile.map(file => (
         <li key = {file.name}>
            {file.name} - {file.size}bytes
         </li>
      ));

      //displays file name and size for second file
      const files2 = this.state.selectedFile2.map(file => (
         <li key = {file.name}>
            {file.name} - {file.size}bytes
         </li>
      ));

      const {description, selectedFile} = this.state;

      return (
         <div>
            <Header/>
            <img src={logo} alt="logo"/>
            <h1 style={{ color:'#007bff',  textShadow: '-2px 2px #000d1a',}} className="App-title">MasterBLASTer</h1>
            <form onSubmit={this.onSubmit} style={containerWrapper}>
               <div>
                  <Dropzone onDrop={this.onDrop1} id='txt'>
                     {({getRootProps, getInputProps, isDragActive, isDragReject}) =>
                     (<section className="container" style={containerStyles}>
                        <div {...getRootProps({className: 'dropzone'})}>
                           <input {...getInputProps()} name='selectedFile' onChange={this.onFileChange}/>
                           <div style={dropboxStyles}>
                              <h4 style={dropBoxTitle}>Query Identifications</h4>
                              <ul>{files1}</ul>
                              {!isDragActive && 'Click here or drop a txt file to upload'}
                              {isDragActive && !isDragReject && 'Drop file'}
                              {isDragReject && 'File type is not accepted, sorry'}
                           </div>
                        </div>
                     </section>
                  )}
                  </Dropzone>
                  <Dropzone onDrop={this.onDrop2} id='fasta'>
                     {({getRootProps, getInputProps,isDragActive, isDragReject}) =>
                     (<section className="container" style={containerStyles}>
                        <div {...getRootProps({className: 'dropzone'})}>
                           <input {...getInputProps()} name='selectedFile2' onChange={this.onFileChange2}/>
                           <div style={dropboxStyles}>
                              <h4 style={dropBoxTitle}>Query Database</h4>
                              <ul>{files2}</ul>
                              {!isDragActive && 'Click here or drop a Fasta file to upload'}
                              {isDragActive && !isDragReject && 'Drop file'}
                              {isDragReject && 'File type is not accepted, sorry'}
                           </div>
                        </div>
                     </section>
                  )}
                  </Dropzone>
               </div>
               <div>
                  <FormGroup as={Col} controlId="formGridState">
                     <FormLabel >Preloaded query databases...< /FormLabel>
                     <FormControl as = "select" value = {this.state.value} onChange = {this.handleChange}>
                        <option value='' key='0'>None</option>
                        {this.state.refseqlist.map((v) =>
                           (<option value={v.filename} key={v.id}>{v.name}</option>))
                        }
                     </FormControl>
                  </FormGroup>
                  <FormGroup as={Col} controlId="formGridState">
                     <FormLabel >Target...< /FormLabel>
                     <FormControl as = "select" value = {this.state.value2} onChange = {this.handleChange2}>
                        <option value='' key='0'>None</option>
                        {this.state.targetList.map((v) =>
                           (<option value={v.filename} key={v.id}>{v.name}</option>))
                        }
                     </FormControl>
                  </FormGroup>
               </div>
               <button type="submit">Submit</button>
            </form>
         </div>
      );
   }
}
export default withRouter(UserForm);
