import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    
    start: {
        paddingRight: 8,
    },
});

export default function Time(props) {
    
    const classes = useStyles();
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.time.value===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault({"start": "08:00", "end":"20:00"})
            }
        }
    }, [props.interface])

    return (
        <>
            <TextField className={classes.start} variant="outlined" onChange={(e) => props.interface.directive('SetTime', {"start": e.target.value, "end": props.value.end }) } 
                    id="start" label="Start" type="time" defaultValue={props.interface.time.value.start ? props.interface.time.value.start : ""} 
                    InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
            <TextField variant="outlined" onChange={(e) => props.interface.directive('SetTime', {"start": props.interface.time.value.start, "end": e.target.value }) }
                    id="end" label="End" type="time" defaultValue={ props.interface.time.value.end ? props.interface.time.value.end : ""} 
                    InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
        </>
    );

}


