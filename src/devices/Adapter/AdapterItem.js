import React, { useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';

import ReplayIcon from '@material-ui/icons/Replay';
import ClearIcon from '@material-ui/icons/Clear';

import Moment from 'react-moment';
import 'moment-timezone';

import SofaListItem from 'components/SofaListItem'
import CardBase from 'components/CardBase'

import { deviceByEndpointId, register, unregister} from 'store/deviceHelpers'
import { directive } from 'store/directive'
import useDeviceStateStore from 'store/deviceStateStore'

export default function AdapterItem(props) { 

    const device = deviceByEndpointId(props.endpointId)
    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
 
    useEffect(() => {
        register(props.endpointId, "adapteritem"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "adapteritem"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])

    function getErrorState(count) {
        try {

            if (deviceState.PowerController.powerState.value==='OFF') {
                return 'disabled'
            }
            
            if (deviceState.AdapterHealth.hasOwnProperty('errors')) {
                if (deviceState.AdapterHealth.errors.value > count) {
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
            if (deviceState.AdapterHealth.hasOwnProperty('errors')) {
                return "Errors: "+deviceState.AdapterHealth.errors.value
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
            if (deviceState.AdapterHealth.hasOwnProperty('datasize')) {
                return "/ Data: "+deviceState.AdapterHealth.datasize.value
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
            if (deviceState.AdapterHealth.startup.value) {
                if (deviceState.AdapterHealth.startup.value==="Remote") { return "Remote" }
                return <Moment format="ddd MMM D h:mm:sa">{deviceState.AdapterHealth.startup.value}</Moment>
            }
        } 
        catch {}
        return "Not started"
    }


    function getActiveState() {
        try {
            if (deviceState.ServiceController.activeState.value!=="unknown") {
                return " ("+deviceState.ServiceController.activeState.value+")"
            }
        }
        catch {}
        return ""
    }

    return (
        <CardBase >
            <SofaListItem   button={true} onClick={ () => window.open(deviceState.AdapterHealth.url.value, '_'+device.friendlyName) }
                            avatarState={ getErrorState(5) } avatar={device.friendlyName.charAt()}
                            primary={ device.friendlyName + getActiveState() } secondary={deviceState.AdapterHealth.url.value}
            />
            <SofaListItem   button={false} 
                            primary={getStartupDate()} secondary={ getErrorCount()+" "+getDataSize()}
                            secondaryActions={ 
                                getStartupDate()!=='Remote' &&
                                <>
                                    <IconButton size={"small"} onClick={ () => directive(props.endpointId, "PowerController", 'TurnOn')} ><ReplayIcon /></IconButton>
                                    <IconButton size={"small"} onClick={ () => directive(props.endpointId, "PowerController", 'TurnOff')} ><ClearIcon /></IconButton>
                                </>
                            }
            />
       </CardBase>
    );
}

