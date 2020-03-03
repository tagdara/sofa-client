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
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'TimeController', 'SetTime', { "time" : { "start" : "08:00", "end": "20:00"}}, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
    
    function handleChange(part, val) {
        var data=props.item.value
        data[part]=val
        props.directive(props.device.endpointId, 'TimeController', 'SetTime', { "time" : data }, {}, props.item.instance)
    }
    


    return (
        <>
            <TextField className={classes.start} variant="outlined" onChange={(e) => handleChange('start',e.target.value) }
                    id="start" label="Start" type="time" defaultValue={props.item.value.start ? props.item.value.start : ""} 
                    InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
            <TextField variant="outlined" onChange={(e) => handleChange('end',e.target.value) }
                    id="end" label="End" type="time" defaultValue={ props.item.value.end ? props.item.value.end : ""} 
                    InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
        </>
    );

}


