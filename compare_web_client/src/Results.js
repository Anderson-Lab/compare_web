import React, {Component} from "react";
import {Button, Container, Divider, Header, Segment, Table} from "semantic-ui-react";
import FastaSelection from "./ChromosomeSelection";
import FileSelection from "./FileSelection";
import {CreateStreamlineJob, GetAvailableDatabases} from "./apis/backend";
import GenomeSelection from "./GenomeSelection";
import ChromosomeSelection from "./ChromosomeSelection";

const ResultsPage = (results) => {

    return (
        <Segment raised padded>

            <Header content='Crispr Streamline' size='large' color='blue'/>

            <Table celled structured >
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowspan="2">Clinical Significance</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Variance Type</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Associated Phenotypes</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Links</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
            </Table>

            <Button size='large' color='blue' content='Export to CSV!' icon='rocket' fluid
                    
            />

        </Segment>
    )
};

export default ResultsPage;

