import React from 'react';
import { TimeInput } from '@mantine/dates';

const TimeSelect = props => {


    return (
        <TimeInput  size="sm" disabled={props.disabled} 
                        label="time" value={props.value} 
                        onChange={props.select} 
        />
    )
}

export default TimeSelect;