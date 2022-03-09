import React, {Component} from "react";
import {Button, Container, Divider, Grid, Header, Loader, Segment} from "semantic-ui-react";
import {DownloadResults, GetJobStatus} from "./apis/backend";
import {useParams} from "react-router-dom";

class Job extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.getStatus()
    }

    getStatus = () => GetJobStatus(this.props.params.jobId).then(response => {
        if (!response.complete)
            setTimeout(this.getStatus, 30000)

        this.setState({
            loading : false,
            status : response.status,
            message : response.message,
            complete : response.complete,
            success : response.success
        })
    })

    startNewJob = () => {
        window.location.href = '/'
    }

    downloadAsXml = () => DownloadResults(this.props.params.jobId, 'xml')
    downloadAsTxt = () => DownloadResults(this.props.params.jobId, 'txt')
    downloadAsXlsx = () => DownloadResults(this.props.params.jobId, 'xlsx')

    render() {
        return (
            <Segment raised padded>

                {this.state.loading
                    ? <Loader active inline='centered' size='large' content='Loading Job Status' />
                    : <span>
                        <Header content='Blast Job Status' size='large' color='blue' dividing/>

                        <Header content={this.state.status} size='large' color='violet' textAlign='center'/>

                        <Divider hidden />
                        <Divider />
                        <Divider hidden />

                        <Container textAlign='center'>{this.state.message}</Container>

                        <Divider hidden />
                        <Divider />

                        { !this.state.complete ? null :
                            <span>
                                <Grid>
                                    <Grid.Column width={5}>
                                        <Button content='Download as .xlsx' color='blue'
                                                fluid icon='download' size='large'
                                                onClick={this.downloadAsXlsx}/>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Button content='Download as .txt' color='purple'
                                                fluid icon='download' size='large'
                                                onClick={this.downloadAsTxt}/>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Button content='Download as .xml' color='violet'
                                                fluid icon='download' size='large'
                                                onClick={this.downloadAsXml}/>
                                    </Grid.Column>
                                </Grid>

                                <Divider hidden />
                            </span> }



                        <Button content='Start New Blast' color='blue' basic fluid size='large' onClick={this.startNewJob}/>

                    </span>}

            </Segment>
        )
    }
}

const withRouter = Job => props => {
    const params = useParams()

    return (
        <Job {...props} params={params} />
    )
}

export default withRouter(Job)
