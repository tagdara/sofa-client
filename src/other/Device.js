import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import TuneIcon from '@material-ui/icons/Tune';

import GridItem from '../GridItem';

const useStyles = makeStyles(theme => {
    return {      

        item: {
            minHeight: 54,
        }
    }
})

export default function Device(props) {
    
    const classes = useStyles();
 
    function handlePowerChange(event) {
        props.directive(props.device.endpointId, "PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    function nestLine(item) {
        if (props.device.PowerController.powerState) {
            if (props.nested) { return item }
            return <GridItem>{item}</GridItem>
        }
        return null
    }
    
    function energy() {
        if (props.device.hasOwnProperty('EnergySensor')) {
            return props.device.EnergySensor.power.value+"W"
        }
        return null
    }

    return ( 
        props.device.PowerController &&
        <React.Fragment>
            { nestLine(
            <ListItem className={classes.item} >
                <ToggleAvatar noback={true} avatarState={ props.device.PowerController.powerState.value==='ON' ? 'on' : 'off'}>{ props.icon ? props.icon : <TuneIcon />}</ToggleAvatar>
                <ListItemText primary={props.device.friendlyName} secondary={ energy()} />
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem> )
            }
        </React.Fragment>
    );
}


