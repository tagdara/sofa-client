import React from 'react';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons';

const TimeSelect = props => {

    return (
        <TimeInput  size="sm" disabled={props.disabled} 
                    value={props.value} 
                    onChange={props.setTime} 
                    format="12"
                    icon={ props.icon ? props.icon : <IconClock size={20} /> }
        />
    )
}

export default TimeSelect;