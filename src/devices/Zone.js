import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Moment from 'react-moment';
import 'moment-timezone';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import GridItem from '../GridItem';

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


export default function Zone(props) {    
    
    const classes = useStyles();
    
    function getSensorController() {
        if (props.device.hasOwnProperty('ContactSensor')) {
            return props.device.ContactSensor
        } else if (props.device.hasOwnProperty('MotionSensor')) {
            return props.device.MotionSensor
        }
        return null
    }

    return (
        <GridItem >
            <ListItem onClick={() => props.history(props.name, props.endpointId)}>
                <ToggleAvatar avatarState={ getSensorController().detectionState.value=='NOT_DETECTED' ? 'closed' : 'open' } > 
                    { getSensorController().detectionState.value=='NOT_DETECTED' ? <DoneIcon /> : <ClearIcon /> }
                </ToggleAvatar>
                <ListItemText primary={props.name} secondary={props.changeTime=='Unknown' ? 'Unknown':<Moment format="ddd MMM D h:mm:sa">{props.changeTime}</Moment>} />
            </ListItem>
        </GridItem>
    );
}
