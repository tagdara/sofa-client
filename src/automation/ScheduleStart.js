import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from  '@material-ui/core/TextField';
import EventIcon from '@material-ui/icons/Event';

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
