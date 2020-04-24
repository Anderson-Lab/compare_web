import React, {
   Component
} from 'react';
import axios from 'axios';
import Header from '../header'
import Dropzone from 'react-dropzone';
import logo from '../MasterBlaster.png';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/';
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

      this.onDrop1 = (files) => {
         console.log(files[0]);
         console.log(this);
         let currFileName = files[0].name.split(".");
         let currFileExt = currFileName[currFileName.length - 1];
         console.log(currFileExt);

         if (currFileExt === "txt") {
            console.log("Correct File Type");
            this.onFileChange(files);
         } else {
            console.log("Incorrect File Type");
            alert("Incorrect FIle Type, only txt accepted");
         }

         console.log(this.state);
         console.log(this.state.selectedFile == '');
      };

      this.onDrop2 = (files) => {
         console.log(files[0]);
         console.log(this);
         let currFileName = files[0].name.split(".");
         let currFileExt = currFileName[currFileName.length - 1];
         console.log(currFileExt);

         if (currFileExt === "fasta") {
            console.log("Correct File Type");
            this.onFileChange2(files);
         } else {
            console.log("Incorrect File Type");
            alert("Incorrect FIle Type, only fastas accepted");
         }

         console.log(this.state);
         console.log(this.state.selectedFile2 == '');
      };

      this.state = {
         selectedFile: [],
         selectedFile2: [],
         refseqUsed: false,
         value: '',
         readyToSubmit: false,
         submitted: false,
         uniqueURL: "",
         refseqlist: []
      }
   }

   handleChange(event) {
      this.setState({value: event.target.value});
   }

   onFileChange(e) {
      console.log(e);
      this.setState({selectedFile: e});
   }

   onFileChange2(e) {
      console.log(e);
      console.log(e[0].name);
      this.setState({selectedFile2: e});
   }

   componentDidMount() {
      fetch("./refseq.json")
         .then((res) => res.json())
         .then((data) => this.setState({refseqlist: data}));
   }

   onSubmit(e) {
      e.preventDefault()
      //testing
      console.log(this.state.selectedFile.length)
      console.log(this.state.selectedFile2.length)
      console.log(this.state.value);

      //Variables
      let file1 = this.state.selectedFile;
      let file2 = this.state.selectedFile2;
      let refseq = this.state.value;

      //where both files are provided
      if (file1.length && file2.length && !refseq.length) {
         var formData = new FormData();
         const tempDate = new Date();
         const uniqueVal1 = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds() + '' + tempDate.getMilliseconds();
         for (const key of Object.keys(file1)) {
            formData.append('selectedFile', file1[key], uniqueVal1)
            formData.append('refseqUsed', this.state.refseqUsed);
         }
         const tempDate2 = new Date();
         const uniqueVal2 = tempDate2.getFullYear() + '' + (tempDate2.getMonth() + 1) + '' + tempDate2.getDate() + '' + tempDate2.getHours() + '' + tempDate2.getMinutes() + '' + tempDate2.getSeconds() + '' + tempDate2.getMilliseconds();
         for (const key of Object.keys(file2)) {
            formData.append('selectedFile', file2[key], uniqueVal2)
            console.log(file2[key]);
         }
         if (file1.length > 0 && file2.length > 0) {
            //takes the time submitted of the first file to create unique value
            this.setState({uniqueURL: "/" + uniqueVal1});
         }

         console.log("Axios");
         axios.post("/", formData).then(res => {
            console.log(res);
         });

         //cheap way out going to change
         setTimeout(function() { //Start the timer
            this.setState({submitted: true});
         }.bind(this), 1000)
      } else if (file1.length && !file2.length && refseq.length) {
         console.log("with selection (must change database to accomidate and add state)");
         this.setState({refseqUsed: true});

         formData = new FormData();
         const tempDate = new Date();
         const uniqueVal1 = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds() + '' + tempDate.getMilliseconds();
         for (const key of Object.keys(file1)) {
            formData.append('selectedFile', file1[key], uniqueVal1)
            formData.append('refseqName', this.state.value);
            formData.append('refseqUsed', this.state.refseqUsed);
         }

         if (file1.length > 0 && refseq.length) {
            //takes the time submitted of the first file to create unique value
            this.setState({uniqueURL: "/" + uniqueVal1});
         }

         console.log("Axios");
         axios.post("/", formData).then(res => {
            console.log(this.state);
         });

         //cheap way out going to change
         setTimeout(function() { //Start the timer
            this.setState({submitted: true});
         }.bind(this), 1000)
      } else if (file1.length && file2.length && refseq.length) {
         alert("Too many fastas selected, can only have one");
      } else {
         alert("not all files selected");
      }

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
        height: '180px',
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
        width: '100%',
        height: '180px',
        float: 'left',
        color: '#ffffff',
        backgroundColor: '#007bff',
        border: '5px solid',
        borderRadius: '15px',
        borderColor: '#007bff'
      };

      var dropboxStyles2 = {
        width: '100%',
        height: '250px',
        float: 'left',
        backgroundColor: '#007bff',
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
         <img src={logo} alt="logo"/>
          <h1 style={{ color:'#007bff',  textShadow: '-2px 2px #000d1a',}} lassName="App-title">MasterBLASTer</h1>
         <form onSubmit={this.onSubmit} style={containerWrapper}>
         <div>
          <Dropzone onDrop={this.onDrop1} accept='text/csv' id='txt'>
            {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
              <section className="container" style={containerStyles}>
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} name='selectedFile' onChange={this.onFileChange} />
                  <p style={dropboxStyles}>
                  <aside>
                    <h4 style={ dropBoxTitle }>Query Identifications</h4>
                    <ul>{files1}</ul>
                  </aside>
                     {!isDragActive && 'Click here or drop a txt file to upload'}
                     {isDragActive && !isDragReject && 'Drop file'}
                      {isDragReject && 'File type is not accepted, sorry'}

                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          <Dropzone onDrop={this.onDrop2} id='fasta'>
            {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
              <section className="container" style={containerStyles}>
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} name='selectedFile2' onChange={this.onFileChange2}/>
                  <p style={dropboxStyles}>
                  <aside>
                    <h4 style={ dropBoxTitle }>Query Database</h4>
                    <ul>{files2}</ul>
                  </aside>
                     {!isDragActive && 'Click here or drop a fasta file to upload'}
                     {isDragActive && !isDragReject && 'Drop file'}
                     {isDragReject && 'File type is not accepted, sorry'}
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          </div>
      <div>
        <Form>
          <FormGroup as={Col} controlId="formGridState">
          <FormLabel>Preloaded query databases...</FormLabel>
             <FormControl as="select" value={this.state.value} onChange={this.handleChange}>
             <option value=''>None</option>
             {this.state.refseqlist.map((v) =>
                (<option value={v.filename}>{v.name}</option>)
             )}
             </FormControl>
          </FormGroup>
       </Form>
       <Form>
          <FormGroup as={Col} controlId="formGridState">
          <FormLabel>Target...</FormLabel>
             <FormControl as="select" value={this.state.value} onChange={this.handleChange}>
             <option value=''>None...</option>
             {this.state.refseqlist.map((v) =>
                (<option value={v.filename}>{v.name}</option>)
             )}
             </FormControl>
          </FormGroup>
       </Form>
      </div>

          <button type="submit">Submit</button>
         </form>

      </div>
    );
  }
//------------------------
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
            <form onSubmit={this.onSubmit} style={containerWrapper}>
               <div>
                  <Dropzone onDrop={this.onDrop1} id='txt'>
                     {({getRootProps, getInputProps, isDragActive, isDragReject}) =>
                     (<section className="container" style={containerStyles}>
                        <div {...getRootProps({className: 'dropzone'})}>
                           <input {...getInputProps()} name='selectedFile' onChange={this.onFileChange}/>
                           <div style={dropboxStyles}>
                              <h4 style={{textDecorationLine:'underline', fontSize:30}}>Files</h4>
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
                              <h4 style={{textDecorationLine:'underline', fontSize:30}}>Files</h4>
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
                     <FormLabel >Test..< /FormLabel>
                     <FormControl as = "select" value = {this.state.value} onChange = {this.handleChange}>
                        <option value='' key='0'>None</option>
                        {this.state.refseqlist.map((v) =>
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
