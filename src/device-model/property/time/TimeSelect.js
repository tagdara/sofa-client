import React from 'react';
import { TimeInput } from '@mantine/dates';

const TimeSelect = props => {

    const test = data => {
        console.log('test data', data)
        props.setTime(data)
    }

    return (
        <TimeInput  size="sm" disabled={props.disabled} 
                    value={props.value} 
                    onChange={test} 
                    icon={props.icon}
        />
    )
}

export default TimeSelect;