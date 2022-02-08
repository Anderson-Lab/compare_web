import React, {Component} from "react";
import {Container, Divider, Grid, Header, Segment} from "semantic-ui-react";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode : 'upload'
        }
    }

    queryFileDrop = (e) => {
        console.log('dropped')
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
        let file = e.dataTransfer.items[0].getAsFile();
        console.log(file.name)
    }

    dragOver = (e) => {
        e.preventDefault()
    }

  render() {
    return (
        <div className="App">
            <Container style={{marginTop: '2em'}}>
                <div className='title'>
                    <Header content='Compare Web' size='huge' inverted />
                </div>

                <Divider hidden />

                <Grid className='contentBox'>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                        <Segment raised>
                            <Grid>
                                <Grid.Column width={8}>
                                    <Segment placeholder onDrop={this.queryFileDrop} onDragOver={this.dragOver}>
                                        select
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid>

            </Container>
        </div>
    )
  }
}


