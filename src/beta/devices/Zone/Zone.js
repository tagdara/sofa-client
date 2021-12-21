import React from 'react';
import { selectPage } from 'store/layoutHelpers'

import Moment from 'react-moment';
import 'moment-timezone';

import { Shield, AlertOctagon } from 'react-feather'
import { useRegister } from 'store/useRegister'
import { SplitButtonGroup, SplitButton } from 'beta/components/SplitButton'
import { ActionIcon } from '@mantine/core';

const Zone = props => {

    const { device, deviceState } = useRegister(props.endpointId)
    const zoneState  = deviceState
    const name = device.friendlyName

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
        selectPage('HistoryPage', {"endpointId": props.endpointId, "property":"detectionState"})
    }

    return (
        <SplitButtonGroup >
            <SplitButton onClick={() => historyZone()} >
                <ActionIcon size="md" variant="light" color={open ? "red" : "green"}>
                    { open ? < AlertOctagon size={20} /> : <Shield size={20} />}
                </ActionIcon>     
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary={props.changeTime==='Unknown' ? 
                            'Unknown':<Moment format="ddd MMM D h:mm:sa">{props.changeTime}</Moment>} 

            />
        </SplitButtonGroup>
    )

}

export default Zone;
