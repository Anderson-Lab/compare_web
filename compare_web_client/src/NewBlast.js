import React, {Component} from "react";
import {Button, Container, Divider, Header, Segment} from "semantic-ui-react";
import FastaSelection from "./FastaSelection";
import FileSelection from "./FileSelection";
import {CreateBlastJob, GetAvailableDatabases} from "./apis/backend";

export default class NewBlast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            queryFasta: '',
            targetFasta: '',
            identificationsFile: null,
            loading : false,
            fastaDatabases : [],
            fastaLoaded : false,
            mode : 'existing'
        }
    }

    setMode = (mode) => this.setState({mode})

    onFastaChange = (e, {value, name}) => this.setState({[name]: value})
    onFileChange = (file) => this.setState({'identificationsFile': file})

    createBlast = () => this.setState({loading : true},
            () => CreateBlastJob(this.state.queryFasta, this.state.targetFasta, this.state.identificationsFile)
                .then(result => {

                }))

    componentDidMount() {
        GetAvailableDatabases().then(databases => this.setState({
            fastaDatabases : databases.map(db => ({key : db.name, text : db.name, value : db.filename})),
            fastaLoaded : true
        }))
    }

    render() {
        return (
            <Segment raised padded>

                <Header content='Create New Blast' size='large' color='blue'/>

                <Header content='1. Upload Identifications File' dividing color='violet'/>
                <FileSelection onChange={this.onFileChange}/>

                <Header content='2. Select Fasta Databases' dividing color='violet'/>

                <Button.Group fluid size='large'>
                    <Button color={this.state.mode === 'existing' ? 'violet' : null}
                            icon='list' content='Use Existing Fasta' onClick={() => this.setMode('existing')}/>
                    <Button.Or />
                    <Button color={this.state.mode === 'upload' ? 'violet' : null}
                            icon='upload' content='Use My Own Fasta' onClick={() => this.setMode('upload')}/>
                  </Button.Group>

                {this.state.mode === 'existing'
                    ? <Segment>
                        <Header content='Select Query Fasta' dividing color='purple' size='small'/>
                        <FastaSelection name='queryFasta' onChange={this.onFastaChange} placeholder='Query Fasta'
                                        fastaLoaded={this.state.fastaLoaded} fastaDatabases={this.state.fastaDatabases}/>

                        <Header content='Select Reference Fasta' dividing color='purple' size='small'/>
                        <FastaSelection name='targetFasta' onChange={this.onFastaChange} placeholder='Reference Fasta'
                                        fastaLoaded={this.state.fastaLoaded} fastaDatabases={this.state.fastaDatabases}/>
                    </Segment>
                    : <Segment>
                        <Header content='Coming Soon!' textAlign='center' disabled/>

                        <Container textAlign='center' text>
                            Ability to upload your own Fasta databases is coming soon.
                            In the meantime, if you have a specific database you would like us to add,
                            please email us at <a href='mailto:pander14@calpoly.edu'>pander14@calpoly.edu</a>.
                        </Container>


                    </Segment>}

                <Divider hidden/>

                <Button size='large' color='blue' content='Blast!' icon='rocket' fluid
                        loading={this.state.loading}
                        onClick={this.createBlast}
                        disabled={this.state.identificationsFile == null
                        || !this.state.queryFasta || !this.state.targetFasta}/>

            </Segment>
        )
    }
}
