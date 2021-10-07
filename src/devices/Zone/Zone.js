import React, { useEffect, useContext } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import { LayoutContext } from 'layout/LayoutProvider';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import GridItem from 'components/GridItem';
import ToggleAvatar from 'components/ToggleAvatar';

import Moment from 'react-moment';
import 'moment-timezone';

const Zone = React.memo(props => {

    const { selectPage } = useContext(LayoutContext);
    const zoneState = props.deviceState[ props.endpointId ]

    useEffect(() => {
        props.addEndpointIds("id", props.endpointId, "Zone"+props.endpointId)
        return function cleanup() {
            props.unregisterDevices("Zone"+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])    

    if (!zoneState) { return null }

    const name = props.devices[props.endpointId].friendlyName
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
}, deviceStatesAreEqual);

export default dataFilter(Zone);
