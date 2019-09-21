import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles({
        
    button: {
        maxWidth: 64,
        minWidth: 64,
        marginLeft: 8,
        fontSize: 18,
        fontWeight: "bold",
    },
    bigtext: {
        fontSize: 16,
        fontWeight: "bold",
    }
    
});

const operators = [
    '=',
    '!=',
    '>',
    '>=',
    '<',
    '=<',
];

export default function OperatorButton(props) {

    const classes = useStyles();
    const [anchor, setAnchor] = useState(null)


    function handleClick(event) {
        setAnchor(event.currentTarget);
    };
    
    function handleClose(event) {
        setAnchor(null)
    };
    
    function handleMenuSelect(event, item) {
        setAnchor(null)
        props.setOperator(operators[item])
    };

    return (
        <React.Fragment>
            <Button id={"op"+props.index} onClick={handleClick} className={classes.button} disabled={props.disabled}>
                {props.value ? props.value : "="}
            </Button>
    
            <Menu id="lock-menu" anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
                {operators.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === operators.indexOf(props.value)}
                        onClick={event => handleMenuSelect(event, index)}
                        className={classes.bigtext}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
}
