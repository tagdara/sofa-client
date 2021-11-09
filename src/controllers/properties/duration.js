import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function Duration(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, props.interface.interface.split('.')[1], props.item.command, { "duration" : 1 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleChange(e) {
        props.directive(props.device.endpointId, props.interface.interface.split('.')[1], props.item.command, { "duration" : e.target.value }, {}, props.item.instance)
    }
    
    function valueOrDefault() {
        var val=1
        try {
            if (props.item.value.hasOwnProperty('duration')) {
                val=parseInt(props.item.value.duration)
            }
        } 
        catch {}
        return val
    }
    
    console.log('prop dir', props.directive)
    
    return (
        <>
            <TextField variant="outlined" onChange={handleChange} 
                    id="duration" label="Duration" type="number" defaultValue={valueOrDefault() } 
                    InputLabelProps={{ shrink: true, }} inputProps={{ style: {padding: 10 } }}  />
        </>
    );

}


