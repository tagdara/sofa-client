import React from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    
    start: {
        paddingRight: 8,
        width: "50%",
    },
});

export default function Power(props) {
    
    const classes = useStyles();

    
    function handleChange(val) {
        props.directive(props.device.endpointId, 'EnergySensor', '',  { "power" : parseInt(val) }, {}, props.item.instance)
    }
    
    function valueOrDefault() {
        var val=0
        try {
            val=parseInt(props.item.value.power)
        } 
        catch {}
        return val
    }


    return (
        <>
            <TextField className={classes.start} variant="outlined" onChange={(e) => handleChange(e.target.value) }
                    id="power" label="Power" type="number" value={valueOrDefault()} 
                    InputLabelProps={{ shrink: true, }} inputProps={{ style: {padding: 10 } }}  />
        </>
    );

}


