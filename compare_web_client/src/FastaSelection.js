import React, {Component} from "react";
import {Dropdown} from "semantic-ui-react";

const fastaOptions = [
    { key : 'narwhal', text: 'narwhal', value: 'RefSeq_Narwhal_100_GCF_005190385.1_NGI_Narwhal_1_protein.fasta'},
    { key : 'sealion', text: 'sealion', value: 'sealion'}
]

export default class FastaSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode : 'upload'
        }
    }

    render() {
        return (
            <Dropdown selection fluid
                      placeholder={this.props.placeholder}
                      name={this.props.name}
                      onChange={this.props.onChange}
                      options={fastaOptions} />
        )
    }
}


