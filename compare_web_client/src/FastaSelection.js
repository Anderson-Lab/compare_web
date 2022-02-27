import React, {Component} from "react";
import {Dropdown} from "semantic-ui-react";

export default class FastaSelection extends Component {
    render() {
        return (
            <Dropdown selection fluid
                      loading={!this.props.fastaLoaded}
                      placeholder={this.props.placeholder}
                      name={this.props.name}
                      onChange={this.props.onChange}
                      options={this.props.fastaDatabases} />
        )
    }
}


