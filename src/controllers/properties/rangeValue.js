import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function RangeValue(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, props.interface.interface.split('.')[1], props.item.command, { "rangeValue" : 1 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleChange(e) {
        props.directive(props.device.endpointId, props.interface.interface.split('.')[1], props.item.command, { "rangeValue" : parseInt(e.target.value) }, {}, props.item.instance)
    }
    
    function valueOrDefault() {
        var val=1
        try {
            if (props.item.value.hasOwnProperty('rangeValue')) {
                val=parseInt(props.item.value.rangeValue)
            }
        } 
        catch {}
        return val
    }
    
    return (
        <TextField key={'rv'+props.index} variant="outlined" onChange={handleChange} label="Value" type="number" value={valueOrDefault() } 
                InputLabelProps={{ shrink: true, }} inputProps={{ style: {padding: 10 } }}  />
    );

}


