import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Moment from 'react-moment';
import 'moment-timezone';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridItem from './GridItem';

const useStyles = makeStyles({

    closed: {
        backgroundColor: "#6a6",
        color: "#fff",
    },
    open: {
        color: "#fff",
        backgroundColor: "#e66",
    },

});


export default function HistoryLine(props) {    
    
    const classes = useStyles();

    return (
        <GridItem>
            <ListItem>
                { props.val==='NOT_DETECTED' ?
                    <Avatar className={classes.closed} ><DoneIcon /></Avatar>
                :
                    <Avatar className={classes.open} ><ClearIcon /></Avatar>
                }
                <ListItemText primary={<Moment format={props.justTime ? "h:mm:ssa" : "ddd MMM D h:mm:ssa"}>{props.time}</Moment>} secondary={props.val==='DETECTED' ? 'Open' : 'Closed'} />
            </ListItem>
        </GridItem>
    );
}
