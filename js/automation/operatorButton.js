import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const operators = [
    '=',
    '!=',
    '>',
    '>=',
    '<',
    '=<',
];

class OperatorButton extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: "=",
            anchor: null,
        }
    }
    handleClick = event => {
        this.setState({  anchor: event.currentTarget });
    };
    
    handleClose = event => {
        this.setState({ anchor:null });
    };
    
    handleMenuSelect = (event, item) => {
        this.setState({ value: item, anchor:null });
        this.props.setOperator(operators[item])
    };

    
    render() {
        
        const { classes } = this.props;
        
        return (
            <React.Fragment>
            <Button id={"op"+this.props.index} onClick={this.handleClick}>
                {this.props.value}
            </Button>

            <Menu id="lock-menu" anchorEl={this.state.anchor} open={Boolean(this.state.anchor)} onClose={this.handleClose}>
                {operators.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === operators.indexOf(this.props.value)}
                        onClick={event => this.handleMenuSelect(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            </React.Fragment>
        )
    }
}


export default OperatorButton;