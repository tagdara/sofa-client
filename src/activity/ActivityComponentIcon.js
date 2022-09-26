import React from 'react';
import { Badge } from '@mantine/core';
import { IconArrowsExchange, IconCalendarTime, IconLoader, IconPlayerPlay, IconSquareX } from '@tabler/icons';

const ActivityComponentIcon = props => {

    const icons = { 
        'triggers_count': IconLoader, 
        'conditions_count': IconArrowsExchange,
        'actions_count': IconPlayerPlay,
        'schedules_count': IconCalendarTime, 
        'missing_devices_count': IconSquareX, 
    }

    const colors = { 
        'triggers_count': 'indigo', 
        'conditions_count': 'cyan',
        'actions_count': 'green',
        'schedules_count': 'blue', 
        'missing_devices_count': 'red'
    }   

    function getIcon(category, size=12) {

        var RealIcon = IconSquareX
        if (icons.hasOwnProperty(category)) {
            RealIcon = icons[category]
        }
        return <RealIcon onClick={props.onClick} size={size} />
    }

    return (
        <Badge  size="sm" 
                color = {colors[props.component]}
                varian="light"
                leftSection={ getIcon(props.component) }
                styles={{ leftSection: { display:"flex", alignItems: "center"}}}
        >
            {props.text}
        </Badge>
    )
}

export default ActivityComponentIcon
