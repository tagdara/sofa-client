import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import AnnouncementIcon from '@material-ui/icons/Announcement';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeviceIcon from '../DeviceIcon';
import OperatorButton from "./operatorButton";
import GridItem from '../GridItem';

const useStyles = makeStyles({

      
    input: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    deviceName: {
        padding: 0,
        flexGrow:1,
        flexBasis:0,
    },
    listActions: {
        minWidth: 320,
        width: "100%",
    },
    listItem: {
        padding: "8 16",
    },

});


export default function AutomationTrigger(props) {
    
    const classes = useStyles();

    function editTriggerValue(value) {
        var trigger=props.item
        trigger.value=value
        saveTrigger(trigger)
    }
    
    function editOperatorValue(value) {
        var trigger=props.item
        trigger.operator=value
        saveTrigger(trigger)
    }
    
    function saveTrigger(trigger) {
        props.save(props.index, trigger)
    }
    
    return (
        <GridItem wide={props.wide}  nopad={true}>
            <ListItem className={classes.listItem} >
                <ListItemIcon><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
                <ListItemText primary={props.name} secondary={props.item.controller} className={classes.deviceName}/>
                { props.remove &&
                    <ListItemSecondaryAction className={classes.listItem}>
                        <ListItemIcon onClick={() => props.delete(props.index)}><CloseIcon /></ListItemIcon>   
                    </ListItemSecondaryAction>
                }
            </ListItem>
            <ListItem>
                <OperatorButton index={props.index} value={props.item.operator} setOperator={ editOperatorValue }/>
                <TextField
                        className={classes.input}
                        id={'trigger'+props.index}
                        label={props.item.propertyName}
                        value={props.item.value}
                        onChange={(e) => editTriggerValue(e.target.value)}
                />
            </ListItem>
        </GridItem>

    )
}


