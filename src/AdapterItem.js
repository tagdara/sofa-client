import React from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';

import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';

import Moment from 'react-moment';
import 'moment-timezone';

export default function AdapterItem(props) { 

    console.log('Adapter',props.adapter)

    
    function getErrorState(count) {
        try {

            if (props.adapter.PowerController.powerState.value==='OFF') {
                return 'disabled'
            }
            
            if (props.adapter.AdapterHealth.logged.value.hasOwnProperty('ERROR')) {
                if (props.adapter.AdapterHealth.logged.value.ERROR > count) {
                    return 'on'
                } else {
                    return 'closed'
                }
            } else {
                return 'disabled'
            }
        }
        catch {
            return 'disabled'
        }
    }

    function getErrorCount() {
        try {
            if (props.adapter.AdapterHealth.logged.value.hasOwnProperty('ERROR')) {
                return "Errors: "+props.adapter.AdapterHealth.logged.value.ERROR
            } else {
                return "No Errors"
            }
        }
        catch {
            return ""
        }
    }
    
    function getStartupDate() {
        try {
            if (props.adapter.AdapterHealth.startup.value) {
                return <Moment format="ddd MMM D h:mm:sa">{props.adapter.AdapterHealth.startup.value}</Moment>
            }
        } 
        catch {}
        return ""
    }


    return (
        <GridItem wide={props.wide} >
            <ListItem button onClick={ () => window.open(props.adapter.AdapterHealth.url.value, '_'+props.adapter.friendlyName) }>
                <ToggleAvatar avatarState={ getErrorState(5) }>{props.adapter.friendlyName.charAt()}</ToggleAvatar>
                <ListItemText primary={props.adapter.friendlyName} secondary={props.adapter.AdapterHealth.url.value}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={getStartupDate()} secondary={ getErrorCount()} />
                <ListItemSecondaryAction>
                    <IconButton size={"small"} onClick={ () => props.directive(props.adapter.endpointId, "PowerController", 'TurnOn')} ><ReplayIcon /></IconButton>
                </ListItemSecondaryAction>
            </ListItem>
       </GridItem>
    );
}

