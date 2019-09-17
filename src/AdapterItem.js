import React from 'react';

import ToggleAvatar from './ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';

import Moment from 'react-moment';
import 'moment-timezone';

export default function AdapterItem(props) { 
    
    function getErrorState(count) {
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

    function getErrorCount() {
        if (props.adapter.AdapterHealth.logged.value.hasOwnProperty('ERROR')) {
            return props.adapter.AdapterHealth.logged.value.ERROR
        } else {
            return 0
        }
    }


    return (
        <GridItem wide={props.wide} >
            <ListItem button onClick={ () => window.open(props.adapter.AdapterHealth.url, '_'+props.adapter.friendlyName) }>
                <ToggleAvatar avatarState={ getErrorState(5) }>{props.adapter.friendlyName.charAt()}</ToggleAvatar>
                <ListItemText primary={props.adapter.friendlyName} secondary={props.adapter.AdapterHealth.url.value}/>
            </ListItem>
            <ListItem button onClick={ () => props.adapter.PowerController.directive('TurnOn') }>
                <ListItemIcon><ReplayIcon /></ListItemIcon>
                <ListItemText primary={<Moment format="ddd MMM D h:mm:sa">{props.adapter.AdapterHealth.startup.value}</Moment>} secondary={ getErrorCount()<1 ? "No errors" : "Errors: "+getErrorCount()} />
            </ListItem>
       </GridItem>
    );
}

