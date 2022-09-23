import React from 'react';
import useMode from 'endpoint-model/property/mode/useMode'
import Segment from 'layout/components/Segment'
import { ZapOff, ChevronDown, ChevronUp, ChevronsUp, Minus} from 'react-feather'

export default function EnergyLevelSegment(props) {

    const { modeLabel } = useMode(props.endpointId, "Energy Level", props.value, props.directive)

    const icons = { 
        "Off": <ZapOff size={16} />,
        "Standby": <Minus size={16} />,
        "Low": <ChevronDown size={16} />,
        "Medium": <ChevronUp size={16} />,
        "High": <ChevronsUp size={16} />,
    }

    return (
        <Segment    position={props.position} 
                    size={props.size} 
                    color={ props.color } 
                    onClick={ props.onClick } 
                    icon={ (!props.icon && !props.small) && icons[modeLabel]}
                    value={ !props.icon && !props.small ? modeLabel : icons[modeLabel] }
        />
    )
}

