import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from  '@material-ui/core/TextField';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UnitButton from './UnitButton';

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
            <UnitButton value={props.unit} setUnit={changeUnit} />
        </ListItem>
    )
}
