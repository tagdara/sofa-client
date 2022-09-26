import React from 'react';
import useMode from 'endpoint-model/property/mode/useMode'
import Segment from 'layout/components/Segment'

import { IconPlugX, IconChevronDown, IconChevronUp, IconChevronsUp, IconMinus } from '@tabler/icons';

export default function EnergyLevelSegment(props) {

    const { modeLabel } = useMode(props.endpointId, "Energy Level", props.value, props.directive)

    const icons = { 
        "Off": <IconPlugX size={16} />,
        "Standby": <IconMinus size={16} />,
        "Low": <IconChevronDown size={16} />,
        "Medium": <IconChevronUp size={16} />,
        "High": <IconChevronsUp size={16} />,
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

