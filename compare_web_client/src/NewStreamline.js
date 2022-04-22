import React, {Component} from "react";
import {Button, Container, Divider, Header, Segment} from "semantic-ui-react";
import FastaSelection from "./ChromosomeSelection";
import FileSelection from "./FileSelection";
import {CreateStreamlineJob, GetAvailableDatabases} from "./apis/backend";
import GenomeSelection from "./GenomeSelection";
import ChromosomeSelection from "./ChromosomeSelection";

export default class NewStreamline extends Component {
    constructor(props) {
        super(props);

        this.state = {

            referenceGenome: '',
            referenceChromosome: '',
            fastaFile: null,
            loading : false,
            GenomeList : [{key: "hg19", text: "hg19", value:"hg19"}],
            ChromosomeList : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22, "X", "Y"],
            fastaLoaded : true,
            mode : 'existing'
        }
    }

    setMode = (mode) => this.setState({mode})

    onChromosomeChange = (e, {value, name}) => this.setState({[name]: value, referenceChromosome: value})
    onGenomeChange = (e, {value, name}) => this.setState({[name]: value, referenceGenome: value})
    onFileChange = (file) => this.setState({'fastaFile': file})

    createStreamline = () => this.setState({loading : true},
            () => CreateStreamlineJob(this.state.referenceGenome, this.state.referenceChromosome, this.state.fastaFile)
                .then(result => {

                }))

    componentDidMount() {

     this.setState({

            ChromosomeList :  this.state.ChromosomeList.map(db => ({key : db, text : db, value : db}))

        })
    }

    render() {
        return (
            <Segment raised padded>

                <Header content='Crispr Streamline' size='large' color='blue'/>

                <Header content='1. Upload FASTA File' dividing color='violet'/>
                <FileSelection onChange={this.onFileChange}/>

                  <Segment>
                        <Header content='Select a Genome' dividing color='purple' size='small'/>
                        <GenomeSelection name='Genome' onChange={this.onGenomeChange} placeholder='Genome'
                                        fastaLoaded={this.state.fastaLoaded} GenomeList={this.state.GenomeList}/>

                        <Header content='Select a Chromosome' dividing color='purple' size='small'/>
                        <ChromosomeSelection name='Chromosome' onChange={this.onChromosomeChange} placeholder='Chromosome'
                                        fastaLoaded={this.state.fastaLoaded} ChromosomeList={this.state.ChromosomeList}/>
                    </Segment>
                <Divider hidden/>

                <Button size='large' color='blue' content='Streamline!' icon='rocket' fluid
                        loading={this.state.loading}
                        onClick={this.createStreamline}
                       />

            </Segment>
        )
    }



     // disabled={this.state.fastaFile == null
     //                    || !this.state.referenceGenome || !this.state.referenceChromosome}
}
