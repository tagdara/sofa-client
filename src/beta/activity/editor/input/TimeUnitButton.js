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
    },
    
});

const units = [
    'min',
    'hours',
    'days',
];

const TimeUnitButton = props => {

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
        props.setUnit(units[item])
    };

    return (
        <React.Fragment>
            <Button size="small" id={"op"+props.index} onClick={handleClick} className={classes.button}>
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

export default TimeUnitButton
