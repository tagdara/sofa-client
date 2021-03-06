import React, { memo }  from 'react';
import { makeStyles, withStyles  } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import AnnouncementIcon from '@material-ui/icons/Announcement';
import CloseIcon from '@material-ui/icons/Close';

import DeviceIcon from '../DeviceIcon';
import OperatorButton from "./operatorButton";
import GridItem from '../GridItem';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';


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
    xxreducedButtonPad: {
        padding: "4 16 12 10",
        alignItems: "flex-end",
    },
    eventName: {
        padding: "8 8 8 64",
    },
    flex: {
        display: "flex",
    }
});


const BootstrapInput = withStyles(theme => ({
    input: {
        minWidth: '100px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

function AutomationTrigger(props) {
    
    const classes = useStyles();

    function editTriggerValue(newvalue) {
        var trigger=props.item
        trigger.value=newvalue
        props.save(props.index, trigger)
    }
    
    function editOperatorValue(newvalue) {
        var trigger=props.item
        trigger.operator=newvalue
        props.save(props.index, trigger)
    }

    function handleChange() {
        console.log('noop change')
    }
   
    function getDeviceProperties() {
        var proplist=[]
        for (var i = 0; i < props.device.interfaces.length; i++) {
            //console.log(props.device.interfaces[i], props.device[props.device.interfaces[i]].properties)
            proplist = proplist.concat(props.device[props.device.interfaces[i]].properties);
        } 
        return proplist
    }
 
    
    return (
        <GridItem nolist={true} elevation={0} wide={true}>
            <Grid item xs={props.wide ? 12 : 6 } >
                <ListItem className={classes.listItem} >
                    <ListItemIcon>{ props.controllerProperties.hasOwnProperty('error') ? <CloseIcon/> : <DeviceIcon name={props.device.displayCategories[0]} />}</ListItemIcon>
                    <ListItemText primary={props.device.friendlyName} secondary={ props.controllerProperties.hasOwnProperty('error') ? props.controllerProperties.error : props.item.controller} className={classes.deviceName}/>
                    { props.remove &&
                        <ListItemSecondaryAction className={classes.listItem}>
                            <ListItemIcon onClick={() => props.delete(props.index)}><CloseIcon /></ListItemIcon>   
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            </Grid>
            <Grid item xs={props.wide ? 12 : 6 } className={classes.flex} >
            { props.item.type==="property" ?
                <ListItem className={classes.reducedButtonPad} >
                    <Select value={props.item.propertyName} onChange={handleChange} input={<BootstrapInput name="command" id="command-select" />} >
                        <MenuItem value=""><em>Choose an property</em></MenuItem>
                    { getDeviceProperties().map(action => 
                        <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                    )}
                    </Select>

                    <OperatorButton disabled={ props.item.type==='event' } index={props.index} value={ props.item.operator } setOperator={ editOperatorValue }/>
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
