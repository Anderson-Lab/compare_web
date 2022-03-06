import React, {Component} from "react";
import {Button, Divider, Header, Icon, Segment} from "semantic-ui-react";

export default class FileSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            fileName: ''
        }
    }

    queryFileDrop = (e) => {
        console.log('dropped')
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
        let file = e.dataTransfer.items[0].getAsFile();
        this.useFile(file)
    }

    dragOver = (e) => {
        e.preventDefault()
    }

    selectFile = (e) => {
        let fileInput = document.getElementById("fileInput")
        fileInput.click()
    }

    onFileSelected = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let file = e.target.files[0];
        this.useFile(file)
    }

    useFile = (file) => this.setState({'identificationsFile': file, 'fileName': file.name}, this.props.onChange(file))

    remove = (e) => {
        this.setState({'identificationsFile': null, 'fileName': ''})
        this.props.onChange(null)
    }

    render() {
        return (
            <Segment placeholder onDrop={this.queryFileDrop} onDragOver={this.dragOver} size='small'>
                <Header icon>
                    <Icon name='file alternate outline'/>
                    {!this.state.fileName ? 'Drag File Here' : this.state.fileName}

                </Header>

                <Divider horizontal>Or</Divider>

                {!this.state.fileName
                    ? <Button primary content='Select from Computer' onClick={this.selectFile}/>
                    : <Button color='red' basic content='Remove' icon='delete' onClick={this.remove}/>
                }

                {/* for uploading - should not show*/}
                <input type="file" id="fileInput" style={{display: "none"}} onChange={this.onFileSelected}/>
            </Segment>
        )
    }
}


