import React, {Component} from "react";
import {Button, Container, Divider, Header, Segment, Table} from "semantic-ui-react";
import { ResultRow } from "./ResultRow";


const ResultsPage = () => {
    const res = {ClinicalSignificance: "Pathogenic", VarianceType: "Single Nucleotide Variant", AssociatedPhenotypes:"Early Infantile Epileptic Encophalopathy", Links: "NCBI | OMIM | Orphanet"};
    const res2 = {ClinicalSignificance: "Pathogenic", VarianceType: "Single Nucleotide Variant", AssociatedPhenotypes:"Benign familial neonatal seizures", Links: "NCBI | OMIM | Orphanet"};
    const res3 = {ClinicalSignificance: "Pathogenic", VarianceType: "Deletion", AssociatedPhenotypes:"Early Infantile Epileptic Encephalopathy with bursts", Links: "NCBI | OMIM | Orphanet"};
    const results = [res, res2, res3]

    const resultRows = results.map((res) => (
        <ResultRow CS={res.ClinicalSignificance} VT={res.VarianceType} AP={res.AssociatedPhenotypes}  Links = {res.Links}/>
      ));
    return (
        <Segment raised padded>

            <Header content='Phenotype Results' size='large' color='blue'/>

            <Table celled structured >
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowspan="2">Clinical Significance</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Variance Type</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Associated Phenotypes</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Links</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>{resultRows}</Table.Body>
            </Table>

            <Button size='large' color='blue' content='Export to CSV!' icon='rocket' fluid
                    
            />

        </Segment>
    )
};

export default ResultsPage;

