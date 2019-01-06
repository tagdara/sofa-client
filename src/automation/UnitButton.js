import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles({
        
    button: {
        maxWidth: 64,
        minWidth: 64,
    },
    
});

const units = [
    'min',
    'hours',
    'days',
];

export default function UnitButton(props) {

    const classes = useStyles();
    const [value, setValue] = useState("min")
    const [anchor, setAnchor] = useState(null)


    function handleClick(event) {
        setAnchor(event.currentTarget);
    };
    
    function handleClose(event) {
        setAnchor(null)
    };
    
    function handleMenuSelect(event, item) {
        setValue(item)
        setAnchor(null)
        props.setUnit(units[item])
    };

    return (
        <React.Fragment>
            <Button id={"op"+props.index} onClick={handleClick} className={classes.button}>
                {props.value ? props.value : "min"}
            </Button>
    
            <Menu id="lock-menu" anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
                {units.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === units.indexOf(props.value)}
                        onClick={event => handleMenuSelect(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
}
