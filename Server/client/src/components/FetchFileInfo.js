import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
const baseURL = "http://localhost:3000/";

class FetchFileInfo extends Component {

   constructor(props){
      super(props);
      this.handleOnclick = this.handleOnclick.bind(this);
      this.state = {
         fileName1: "",
         fileName2: "",
         targetName: "",
         type1: "",
         type2: "",
         size1: "",
         size2: "",
         new_name1: "",
         new_name2: "",
         id: "",
         isLoading: 1,
         results_file: "",
         count: 0,
      }
   }

   fetchFile(){
      const currID = window.location.href.split("/")[window.location.href.split("/").length - 1]
      fetch(baseURL + currID)
         .then(response => response.json())
         .then(data =>{
               this.setState({
                  fileName1: data[0].fileName1,
                  fileName2: data[0].fileName2,
                  targetName: data[0].targetName,
                  type1: data[0].type1,
                  type2: data[0].type2,
                  size1: data[0].size1,
                  size2: data[0].size2,
                  new_name1: data[0].new_name1,
                  new_name2: data[0].new_name2,
                  id: data[0].id,
                  results_file: data[0].results_file,
                  isLoading: data[0].isLoading
               })
            });
   }

   //checks to see if the blast python script is finised running
   isLoading(){
      const currID = window.location.href.split("/")[window.location.href.split("/").length - 1]
      fetch(baseURL + currID)
         .then(response => response.json())
         .then(data => this.setState({
            isLoading: data[0].isLoading
         }));

      if(this.state.isLoading === 1){
         clearInterval(this.timer);
         console.log("done fetching data");
      }
   }

   componentDidMount(){
      this.fetchFile();
      //continues to call isLoading() every 5 seconds
      this.timer = setInterval(() => this.isLoading(), 5000);
      console.log(this.state.fileName1);
   }



   //calls download api when button is clicked
   handleOnclick() {
      fetch(baseURL + 'downloads')
         .then(response => {
            if(response.status === 200){
               response.blob().then(blob => {
                  let url = window.URL.createObjectURL(blob);
   					let a = document.createElement('a');
   					a.href = url;
   					a.download = this.state.results_file;
   					a.click();
               });
            }else{
               alert("XML results file parsing (may take a few minutes)...");
            }
         });
   }



   render(){
      const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      return(
         <div>
            <div>
               <h1>Files Provided</h1> <br></br>
               Identification File: {this.state.fileName1} <br></br>
               Query Database: {this.state.fileName2} <br></br>
               Target File: {this.state.targetName}
            </div>
            <div>
            {!this.state.isLoading ? (
                  <div>
                     <div>
                        <br></br>Please wait while Blast is getting your files ready.
                     </div>
                     <div style = {style}>
                        <ReactLoading type={"spin"} color={"black"} />
                     </div>
                  </div>
               ) :
               (
                  <div>
                     <div>
                        <br></br>Blast complete. Your file is ready to download.
                     </div>
                     <div style = {style}>
                        <Button onClick={this.handleOnclick}>Download Results File (txt)</Button>
                     </div>
                  </div>
               )}

            </div>
         </div>
      )
   }
}

export default FetchFileInfo;
