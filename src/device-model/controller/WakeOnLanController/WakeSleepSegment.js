import React, { useState } from 'react';
import usePowerState from 'device-model/property/powerState/usePowerState'
import Segment from 'components/Segment'
import { IconBroadcast, IconZzz } from '@tabler/icons';
import { useTimeout } from '@mantine/hooks';
import { Loader } from '@mantine/core';

export default function WakeSleepSegment(props) {

    const { powerStateBool, toggle } = usePowerState(props.endpointId, props.value, props.directive)
    const [ waiting, setWaiting ] = useState(false);

    const { start } =  useTimeout(() => setWaiting(false), 5000);
    const icon = powerStateBool ? <IconZzz size={16} /> : ( waiting ? <Loader size={16} /> : <IconBroadcast size={16} /> ) 
    const label = powerStateBool ? "Sleep" : "Wake"

    const sendToggle = () => {
        if (!powerStateBool) {
            setWaiting(true)
            start()
        }
        toggle()
    }

    return (
        <Segment    position={props.position} 
                    size={props.size} 
                    color={ props.color } 
                    onClick={sendToggle} 
                    icon={ (props.icon && props.label) && icon}
                    value={ props.label ? label : icon }
        />
    );
}

