import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SofaListItem from './SofaListItem'
import GridItem from './GridItem'
import ReplayIcon from '@material-ui/icons/Replay';
import ClearIcon from '@material-ui/icons/Clear';

import Moment from 'react-moment';
import 'moment-timezone';

export default function AdapterItem(props) { 

    function getErrorState(count) {
        try {

            if (props.deviceState.PowerController.powerState.value==='OFF') {
                return 'disabled'
            }
            
            if (props.deviceState.AdapterHealth.logged.value.hasOwnProperty('ERROR')) {
                if (props.deviceState.AdapterHealth.logged.value.ERROR > count) {
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
            if (props.deviceState.AdapterHealth.logged.value.hasOwnProperty('ERROR')) {
                return "Errors: "+props.deviceState.AdapterHealth.logged.value.ERROR
            } else {
                return "No Errors"
            }
        }
        catch {
            return ""
        }
    }

    function getDataSize() {
        try {
            if (props.deviceState.AdapterHealth.hasOwnProperty('datasize')) {
                return "/ Data: "+props.deviceState.AdapterHealth.datasize.value
            } else {
                return ""
            }
        }
        catch {
            return ""
        }
    }

    
    function getStartupDate() {
        try {
            if (props.deviceState.AdapterHealth.startup.value) {
                return <Moment format="ddd MMM D h:mm:sa">{props.deviceState.AdapterHealth.startup.value}</Moment>
            }
        } 
        catch {}
        return "Not started"
    }


    return (
        <GridItem wide={props.wide} >
            <SofaListItem   button={true} onClick={ () => window.open(props.deviceState.AdapterHealth.url.value, '_'+props.device.friendlyName) }
                            avatarState={ getErrorState(5) } avatar={props.device.friendlyName.charAt()}
                            primary={props.device.friendlyName+" ("+props.deviceState.ServiceController.activeState.value+")"} secondary={props.deviceState.AdapterHealth.url.value}
            />
            <SofaListItem   button={false} 
                            primary={getStartupDate()} secondary={ getErrorCount()+" "+getDataSize()}
                            secondaryActions={ 
                            <>
                                <IconButton size={"small"} onClick={ () => props.directive(props.device.endpointId, "PowerController", 'TurnOn')} ><ReplayIcon /></IconButton>
                                <IconButton size={"small"} onClick={ () => props.directive(props.device.endpointId, "PowerController", 'TurnOff')} ><ClearIcon /></IconButton>
                            </>
                            }
            />
       </GridItem>
    );
}

