import React from 'react';
import usePowerState from 'device-model/property/powerState/usePowerState'
import Segment from 'components/Segment'
import { Moon, Loader } from 'react-feather'

export default function WakeSleepSegment(props) {

    const { powerStateBool, toggle } = usePowerState(props.endpointId, props.value, props.directive)
    
    const icon = powerStateBool ? <Moon size={16} /> : <Loader size={16} /> 
    const label = powerStateBool ? "Sleep" : "Wake"

    return (
        <Segment    position={props.position} 
                    size={props.size} 
                    color={ props.color } 
                    onClick={toggle} 
                    icon={ (!props.icon && !props.small) && icon}
                    value={ !props.icon && !props.small ? label : icon }
        />
    );
}

