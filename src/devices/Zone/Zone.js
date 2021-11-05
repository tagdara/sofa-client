import React, { useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import { selectPage } from 'store/layoutHelpers'
import GridItem from 'components/GridItem';
import ToggleAvatar from 'components/ToggleAvatar';

import Moment from 'react-moment';
import 'moment-timezone';

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { register, unregister } from 'store/deviceHelpers'

const Zone = props => {

    const device = useDeviceStore( state => state.devices[props.endpointId] )
    const zoneState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = device.friendlyName

    useEffect(() => {
        register(props.endpointId, 'zone-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'zone-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])  

    if (!zoneState) { return null }

    const open = isOpen(props.endpointId)

    function isOpen(endpointId) {
        if (zoneState.hasOwnProperty('ContactSensor')) { 
            return zoneState.ContactSensor.detectionState.value === "DETECTED"
        }
        if (zoneState.hasOwnProperty('MotionSensor')) { 
            return zoneState.MotionSensor.detectionState.value === "DETECTED"
        }
        return false
    }

    function historyZone(name, endpointId) {
        selectPage('HistoryLayout', {"endpointId": props.endpointId, "property":"detectionState"})
    }

    return (
        <GridItem >
            <ListItem onClick={() => historyZone()}>
                <ToggleAvatar avatarState={ open ? 'open': 'closed' } > 
                    { open ? <ClearIcon /> : <DoneIcon />  }
                </ToggleAvatar>
                <ListItemText   primary={name} 
                                secondary={props.changeTime==='Unknown' ? 
                                            'Unknown':<Moment format="ddd MMM D h:mm:sa">{props.changeTime}</Moment>} 
                            />
            </ListItem>
        </GridItem>
    );
}

export default Zone;
