import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

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


export default function OperatorButton(props) {

    const classes = useStyles();
    const [anchor, setAnchor] = useState(null)
    const operatorList=['=','!=','>','>=','<','=<',]


    function handleClick(event) {
        setAnchor(event.currentTarget);
    };
    
    function handleClose(event) {
        setAnchor(null)
    };
    
    function handleMenuSelect(item) {
        setAnchor(null)
        props.setOperator(item)
    };
    
    function operators() {
        if (props.anyOp) {
            console.log('any operators...', props.value)
            return ['Any', ...operatorList]
        }
        return operatorList
    }

    return (
        <React.Fragment>
            <Button id={"op"+props.index} onClick={handleClick} className={classes.button} disabled={props.disabled}>
                {props.value}
            </Button>
    
            <Menu id="lock-menu" anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
                {operators().map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={ option===props.value }
                        onClick={event => handleMenuSelect(option)}
                        className={classes.bigtext}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
}

OperatorButton.defaultProps = {
    anyOp: false,
    value: "",
}
