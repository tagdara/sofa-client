import React from 'react';
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import StatusLock from 'devices/Lock/StatusLock';
import StackCard from 'components/StackCard'

export default function Opener(props) {
    
    const endpointId = endpointIdByFriendlyName(props.deviceName)  
    console.log('opener endpoint', props.deviceName, endpointId)
 
    return (
        <StackCard>
            <StatusLock endpointId={endpointId} displayName={ props.displayName } buttonDuration={props.buttonDuration} />
        </StackCard>
    );
}

