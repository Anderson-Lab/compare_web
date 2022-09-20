import React, {Component} from "react";
import {Container, Divider, Grid, Header} from "semantic-ui-react";
import NewBlast from "./NewBlast";
import { Route, Routes } from "react-router-dom";
import Job from "./Job";
export default class App extends Component {

  render() {
        return (
        <div className="App">
            <Container style={{marginTop: '2em'}}>
                <div className='title'>
                    <Header content='Master Blaster' size='huge' inverted />
                </div>

                <Divider hidden />

                <Grid className='contentBox'>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                        <Routes>
                            <Route path='/' element={<NewBlast />}/>
                            <Route path='/job/:jobId' element={<Job />}/>
                        </Routes>

                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid>

                <div className='title'>
                    <Header content='Disclaimer: Identification of certain commercial equipment, instruments, software, or materials does not imply recommendation or endorsement by the National Institute of Standards and Technology, nor does it imply that the products identified are necessarily the best available for the purpose.' inverted />
                </div>
            </Container>
        </div>
    )
  }
}
