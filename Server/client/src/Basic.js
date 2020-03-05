import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class Basic extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files})
    };
    this.state = {
      files: []
    };
  }

  render() {

    // let rgb = []
    //     for (var i = 0; i < 3; i++) {
    //       let r = Math.floor(Math.random() * 256)
    //       rgb.push(r)
    //     }

    var containerStyles = {
        // width: '710px',
        width: '90%',
        minWidth: '710px',
        height: '160px',
        display: 'inline-block',
      };

      var dropboxStyles = {
        // maxWidth: '950px',
        // minWidth: '339px',
        width: '49%',
        height: '250px',
        float: 'left',
        // backgroundColor: `rgb(${rgb})`,
        backgroundColor: '#007bff',
        display: 'inline-block',
      };

      var dropboxStyles2 = {
        // maxWidth: '950px',
        // minWidth: '339px',
        width: '49%',
        height: '150px',
        float: 'right',  
        // backgroundColor: `rgb(${rgb})`,
        backgroundColor: '#007bff',
        display: 'inline-block',
      };

    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <div className="container" style={containerStyles}>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p style={dropboxStyles}>
                  
                  Drop small txt file here
                  <aside>
                    <h4 style={{textDecorationLine: 'underline', fontSize: 30}}>Files</h4>
                    <ul>{files}</ul>
                  </aside>
              </p>
            </div>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p style={dropboxStyles2}>
                  
                  Drop fasta file here
                  <aside>
                    <h4 style={{textDecorationLine: 'underline', fontSize: 30}}>Files</h4>
                    <ul>{files}</ul>
                  </aside>
              </p>
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default Basic