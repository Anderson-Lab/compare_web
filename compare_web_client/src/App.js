import React, {Component} from "react";
import {Container, Divider, Grid, Header} from "semantic-ui-react";
import NewBlast from "./NewBlast";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode : 'newBlast',
        }
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
                        {this.state.mode === 'newBlast' ? <NewBlast /> : null}
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid>
            </Container>
        </div>
    )
  }
}
