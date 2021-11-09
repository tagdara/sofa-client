import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from  '@mui/material/TextField';
import EventIcon from '@mui/icons-material/Event';

const useStyles = makeStyles({
    shortLabel: {
        flexGrow:0,
    },
    label: {
        flexGrow:1,
        flexBasis:0,
        padding: 0,
    },
    input: {
        marginLeft:8,
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
        padding: 6,
    },
});


export default function ScheduleStart(props) {
    
    const classes = useStyles();

    function shortTimeFormat(thisdate) {
        var longdate=new Date().toISOString().replace('Z','')
        if (thisdate) {
            longdate=thisdate
        }

        if (longdate.split(':').length>2) {
            longdate=longdate.split(':')[0]+":"+longdate.split(':')[1]
        }

        return longdate
    }

    return (
        <>
        <Grid item xs={props.wide ? 12 : 4 } >
            <ListItem> 
                <ListItemIcon><EventIcon /></ListItemIcon>
                <ListItemText className={classes.label} primary="Starting" />
                { props.remove ?
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                    </ListItemSecondaryAction>
                    : null
                }
            </ListItem>
        </Grid>
        <Grid item xs={props.wide ? 12 : 4 } >
            <TextField
                className={classes.input}
                type="datetime-local"
                id={'specstart'}
                margin={"normal"}
                value={props.value ? props.value : shortTimeFormat() }
                onChange={(e) => props.change(props.target, e.target.value)}
            />
        </Grid>
        </>
    )
}
