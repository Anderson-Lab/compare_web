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

    let rgb = []
        for (var i = 0; i < 3; i++) {
          let r = Math.floor(Math.random() * 256)
          rgb.push(r)
        }

    var containerStyles = {
        width: '450px',
        height: '250px',
        display: 'inline-block',
      };

      var dropboxStyles = {
        width: '450px',
        height: '250px',
        backgroundColor: `rgb(${rgb})`,
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
          <section className="container" style={containerStyles}>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p style={dropboxStyles}>
                  
                  Drag 'n' drop your files here, or click to select files
                  <aside>
                    <h4 style={{textDecorationLine: 'underline', fontSize: 30}}>Files</h4>
                    <ul>{files}</ul>
                  </aside>
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default Basic