import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Duration(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'ButtonController', 'SetDuration', { "duration" : 1 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleChange(e) {
        props.directive(props.device.endpointId, 'ButtonController', 'SetDuration', { "duration" : e.target.value }, {}, props.item.instance)
    }

    return (
        <>
            <TextField variant="outlined" onChange={handleChange} 
                    id="duration" label="Duration" type="number" defaultValue={props.item.value.duration ? props.item.value.duration : 1} 
                    InputLabelProps={{ shrink: true, }} inputProps={{ style: {padding: 10 } }}  />
        </>
    );

}


