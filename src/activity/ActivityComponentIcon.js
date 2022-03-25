import React from 'react';
import { BroadcastPin, Calendar, Play, QuestionCircle, SignpostSplit } from 'react-bootstrap-icons'
import { ActionIcon, Badge } from '@mantine/core';

const ActivityComponentIcon = props => {

    const icons = { 
        'triggers_count': BroadcastPin, 
        'conditions_count': SignpostSplit,
        'actions_count': Play,
        'schedules_count': Calendar, 
        'missing_devices_count': QuestionCircle, 
    }

    const colors = { 
        'triggers_count': 'indigo', 
        'conditions_count': 'cyan',
        'actions_count': 'green',
        'schedules_count': 'blue', 
        'missing_devices_count': 'red'
    }   

    function getIcon(category, size=14) {

        var RealIcon = QuestionCircle
        if (icons.hasOwnProperty(category)) {
            RealIcon = icons[category]
        }
        return <RealIcon onClick={props.onClick} size={size} />
    }

    return (
        <Badge  size="sm" 
                color = {colors[props.component]}
                varian="light"
                leftSection={
                    <ActionIcon color = {colors[props.component]} size="xs" radius="xl" variant="transparent">
                        { getIcon(props.component) }
                    </ActionIcon>
                }
        >
            {props.text}
        </Badge>
    )
}

export default ActivityComponentIcon
