import React, {Component} from "react";
import {Button, Divider, Grid, Header, Segment} from "semantic-ui-react";
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
        }
    }

    onFastaChange = (e, {value, name}) => this.setState({[name]: value})
    onFileChange = (file) => this.setState({'identificationsFile': file})

    createBlast = () => this.setState({loading : true},
            () => CreateBlastJob(this.state.queryFasta, this.state.targetFasta, this.state.identificationsFile).then(result => {

            }))

    componentDidMount() {
        GetAvailableDatabases().then(databases => this.setState({
            fastaDatabases : databases.map(db => ({key : db.species+db.version, text : `${db.species} (v.${db.version})`, value : db.filename})),
            fastaLoaded : true
        }))
    }


    render() {
        return (
            <Segment raised padded>

                <Header content='Create New Blast' size='large' color='blue'/>

                <Header content='1. Upload Identifications File' dividing color='violet'/>

                <Grid>
                    <Grid.Column width={4}/>
                    <Grid.Column width={8}>
                        <FileSelection onChange={this.onFileChange}/>
                    </Grid.Column>
                    <Grid.Column width={4}/>
                </Grid>

                <Header content='2. Select Query Fasta' dividing color='violet'/>
                <FastaSelection name='queryFasta' onChange={this.onFastaChange} placeholder='Query Fasta'
                                fastaLoaded={this.state.fastaLoaded} fastaDatabases={this.state.fastaDatabases}/>

                <Header content='3. Select Reference Fasta' dividing color='violet'/>
                <FastaSelection name='targetFasta' onChange={this.onFastaChange} placeholder='Target Fasta'
                                fastaLoaded={this.state.fastaLoaded} fastaDatabases={this.state.fastaDatabases}/>

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
