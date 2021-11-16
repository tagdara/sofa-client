import React from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from  '@mui/material/TextField';
import ScheduleIcon from '@mui/icons-material/Schedule';

import TimeUnitButton from 'activity/editor/input/TimeUnitButton';

const useStyles = makeStyles({
    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
        maxWidth: 50,
        marginRight: 16,
    },
});

export default function ScheduleInterval(props) {
    
    const classes = useStyles();

    function changeUnit(newunit) {
        props.change('unit', newunit)    
    }
    
    return (
        <ListItem> 
            <ListItemIcon onClick={props.toggle}><ScheduleIcon /></ListItemIcon>
            <ListItemText className={ classes.shortLabel} primary="Every" />
            <TextField
                className={classes.input}
                id={'specint'}
                margin={"normal"}
                type="number"
                value={props.value}
                onChange={(e) => props.change('interval', e.target.value)}
            />
            <TimeUnitButton value={props.unit} setUnit={changeUnit} />
        </ListItem>
    )
}
