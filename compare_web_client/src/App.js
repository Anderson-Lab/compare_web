import React, {Component} from "react";
import {Container, Divider, Grid, Header} from "semantic-ui-react";
import NewStreamline from "./NewStreamline";
import { Route, Routes } from "react-router-dom";
import Job from "./Job";
import ResultsPage from "./Results";
export default class App extends Component {

  render() {
        return (
        <div className="App">
            <Container style={{marginTop: '2em'}}>
                <div className='title'>
                    <Header content='Crispr Streamline' size='huge' inverted />
                </div>

                <Divider hidden />

                <Grid className='contentBox'>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                        <Routes>
                            <Route path='/' element={<NewStreamline />}/>
                            <Route path='/job/:jobId' element={<Job />}/>
                            <Route path='/results' element={<ResultsPage results={'hi'} />}/>
                        </Routes>

                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid>
            </Container>
        </div>
    )
  }
}
