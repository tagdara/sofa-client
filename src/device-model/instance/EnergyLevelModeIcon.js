import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import { IconPlugOff, IconChevronDown, IconChevronUp, IconChevronsUp, IconMinus } from '@tabler/icons';
export default function EnergyLevelModeIcon(props) {

    const { modeLabel } = useMode(props.endpointId, "Energy Level", props.value, props.directive)
    const iconMap = {
        "Off": <IconPlugOff size={props.size ? props.size : 16} />,
        "Standby": <IconMinus size={props.size ? props.size : 16} />,
        "Low": <IconChevronDown size={props.size ? props.size : 16} />,
        "Medium": <IconChevronUp size={props.size ? props.size : 16} />,
        "High": <IconChevronsUp size={props.size ? props.size : 16} />
    }

    return iconMap[modeLabel]

}

