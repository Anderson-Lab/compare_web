import React, { Component } from 'react';
const baseURL = "http://localhost:3000/";

class FetchFileInfo extends Component {

   constructor(props){
      super(props);
      this.state = {
         fileName1: "",
         fileName2: "",
         type1: "",
         type2: "",
         size1: "",
         size2: "",
         new_name1: "",
         new_name2: "",
         id: "",
         isLoading: false
      }
   }

   componentDidMount(){
      const currID = window.location.href.split("/")[window.location.href.split("/").length - 1]
      console.log(currID);
      this.setState({ isLoading: true });
      fetch(baseURL + currID)
         .then(response => response.json())
         .then(data => this.setState({
            fileName1: data[0].fileName1,
            fileName2: data[0].fileName2,
            type1: data[0].type1,
            type2: data[0].type2,
            size1: data[0].size1,
            size2: data[0].size2,
            new_name1: data[0].new_name1,
            new_name2: data[0].new_name2,
            id: data[0].id,
            isLoading: false
         }));
      console.log(this.state.fileName1);
   }

   render(){
      return(
         <div>
            <div>
               {this.state.id}
            </div>
            <div>
               Type of first file: {this.state.type1} <br></br>
               Type of second file: {this.state.type2} <br></br>
               <br></br>
               Size of first file: {this.state.size1} <br></br>
               Size of second file: {this.state.size2} <br></br>
            </div>
         </div>
      )
   }
}

export default FetchFileInfo;
