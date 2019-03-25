import React, { memo }  from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

import AutomationItemBase from './AutomationItemBase';

const useStyles = makeStyles({

    gridColumn: {
        overflowX: "hidden",
        overflowY: "hidden",
        alignContent: "start",
    },      
    input: {
        marginTop:0,
        marginLeft: 8,
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
        padding: "12 16",
    },
    reducedButtonPad: {
        padding: "4 16 12 10",
        alignItems: "flex-end",
    },
    eventName: {
        padding: "8 8 8 64",
    }

});


function AutomationTrigger(props) {
    
    const classes = useStyles();
    const [value, setValue] = useState('')

    //const [propertyName, setPropertyName] = useState('')
    const [op, setOp] = useState('=')
    const [controller, setController] = useState('')

    function editTriggerValue(newvalue) {
        var trigger=props.item
        setValue(newvalue)
        trigger.value=newvalue
        props.save(props.index, trigger)
    }
    
    function editOperatorValue(newvalue) {
        var trigger=props.item
        setOp(newvalue)
        trigger.operator=newvalue
        props.save(props.index, trigger)
    }
    
    return (
        <GridItem nolist={true} elevation={0} wide={true}>
            <Grid item xs={props.wide ? 12 : 6 } >
                <ListItem className={classes.listItem} >
                    <ListItemIcon>{ props.controllerProperties.hasOwnProperty('error') ? <CloseIcon/> : <DeviceIcon name={props.device.displayCategories[0]} />}</ListItemIcon>
                    <ListItemText primary={props.name} secondary={ props.controllerProperties.hasOwnProperty('error') ? props.controllerProperties.error : props.item.controller} className={classes.deviceName}/>
                    { props.remove &&
                        <ListItemSecondaryAction className={classes.listItem}>
                            <ListItemIcon onClick={() => props.delete(props.index)}><CloseIcon /></ListItemIcon>   
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            </Grid>
            <Grid item xs={props.wide ? 12 : 6 } >
            { props.item.type=="property" ?
                <ListItem className={classes.reducedButtonPad} >
                    <OperatorButton disabled={ props.item.type=='event' } index={props.index} value={ props.item.operator } setOperator={ editOperatorValue }/>
                    <TextField
                            className={classes.input}
                            id={'trigger'+props.index}
                            label={props.item.propertyName}
                            value={props.item.value ? props.item.value : ''}
                            onChange={(e) => editTriggerValue(e.target.value)}
                            disabled={props.controllerProperties.hasOwnProperty('error')}
                    />
                </ListItem>
            :
                <ListItem>
                    <ListItemIcon><AnnouncementIcon /></ListItemIcon>
                    <ListItemText primary={props.item.propertyName} className={classes.deviceName}/>
                </ListItem>
            }
            </Grid>
        </GridItem>
    )
}

export default memo(AutomationTrigger)
