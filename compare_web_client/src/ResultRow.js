import React from "react";
import { Button, Table } from "semantic-ui-react";


export const ResultRow = ({CS, VT, AP, Links}) => (
  <Table.Row>
    <Table.Cell>{CS}</Table.Cell>
    <Table.Cell>{VT}</Table.Cell>
    <Table.Cell>{AP}</Table.Cell>
    <Table.Cell>{Links}</Table.Cell>
  </Table.Row>
);