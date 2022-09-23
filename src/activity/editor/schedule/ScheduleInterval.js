import React from 'react';
import CardLine from 'layout/components/CardLine'
import { TextInput } from '@mantine/core'
import TimeUnitButton from 'activity/editor/input/TimeUnitButton';
import { Clock } from 'react-feather'

export default function ScheduleInterval(props) {
    
    function changeUnit(newunit) {
        props.change('unit', newunit)    
    }
    
    return (
        <CardLine primary="Every" icon={<Clock onClick={props.toggle} size={20}/>} > 
            <TextInput 
                sx={{ width: 100}}
                size="small"
                id = {'specint'}
                type="number"
                value={props.value}
                inputProps={{ maxLength: 4 }}
                onChange={(e) => props.change('interval', e.target.value)}
            />
            <TimeUnitButton value={props.unit} setUnit={changeUnit} />
        </CardLine>
    )
}
