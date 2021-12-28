import React from 'react';
import { TimeInput } from '@mantine/dates';

const TimeSelect = props => {

    console.log('time sel val', props.value)

    const change = val => {
        console.log('change', val)
    }

    return (
        <TimeInput  size="sm" disabled={props.disabled} 
                    value={props.value} 
                    onChange={change} 
                    icon={props.icon}
        />
    )
}

export default TimeSelect;