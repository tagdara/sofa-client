import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Time(props) {
    
    console.log('val',props.value)

    return (
        <>
            <TextField variant="outlined" onChange={(e) => props.changeValue({"start": e.target.value, "end": props.value.end }) } 
                    id="start" label="Start" type="time" defaultValue={props.value ? props.value.start : "08:00"} InputLabelProps={{ shrink: true, }} 
                    inputProps={{ step: 300, style: {padding: 10 } }}  />
            <TextField variant="outlined" onChange={(e) => props.changeValue({"start": props.value.start, "end": e.target.value }) } id="end" label="End" type="time" defaultValue={props.value ? props.value.end : "20:00"} InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
        </>
    );

}


