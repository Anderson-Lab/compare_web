import React, {Component} from "react";
import {Button, Container, Divider, Header, Segment} from "semantic-ui-react";
import FastaSelection from "./FastaSelection";
import FileSelection from "./FileSelection";
import {CreateStreamlineJob, GetAvailableDatabases} from "./apis/backend";

export default class NewStreamline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referenceGenome: '',
            referenceChromosome: '',
            fastaFile: null,
            loading : false,
            fastaDatabases : [],
            fastaLoaded : false,
            mode : 'existing'
        }
    }

    setMode = (mode) => this.setState({mode})

    onFastaChange = (e, {value, name}) => this.setState({[name]: value})
    onFileChange = (file) => this.setState({'fastaFile': file})

    createStreamline = () => this.setState({loading : true},
            () => CreateStreamlineJob(this.state.referenceGenome, this.state.referenceChromosome, this.state.fastaFile)
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

                <Header content='Crispr Streamline' size='large' color='blue'/>

                <Header content='1. Upload FASTA File' dividing color='violet'/>
                <FileSelection onChange={this.onFileChange}/>

                  <Segment>
                        <Header content='Select a Genome' dividing color='purple' size='small'/>
                        <FastaSelection name='Genome' onChange={this.onFastaChange} placeholder='Genome'
                                        fastaLoaded={this.state.fastaLoaded} fastaDatabases={this.state.fastaDatabases}/>

                        <Header content='Select a Chromosome' dividing color='purple' size='small'/>
                        <FastaSelection name='Chromosome' onChange={this.onFastaChange} placeholder='Chromosome'
                                        fastaLoaded={this.state.fastaLoaded} fastaDatabases={this.state.fastaDatabases}/>
                    </Segment>
                <Divider hidden/>

                <Button size='large' color='blue' content='Streamline!' icon='rocket' fluid
                        loading={this.state.loading}
                        onClick={this.createStreamline}
                        disabled={this.state.fastaFile == null
                        || !this.state.referenceGenome || !this.state.referenceChromosome}/>

            </Segment>
        )
    }
}
