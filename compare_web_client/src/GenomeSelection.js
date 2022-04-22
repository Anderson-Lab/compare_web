import React, {Component} from "react";
import {Dropdown} from "semantic-ui-react";

export default class GenomeSelection extends Component {
    render() {
        return (
            <Dropdown selection fluid
                      loading={!this.props.fastaLoaded}
                      placeholder={this.props.placeholder}
                      name={this.props.name}
                      onChange={this.props.onChange}
                      options={this.props.GenomeList} />
        )
    }
}

