import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Duration(props) {
    
    useEffect(() => {
        // Set default if passed undefined
        if (props.interface.duration.value===undefined) {
            if (props.interface.hasOwnProperty('setDefault')) {
                props.interface.setDefault(1)
            }
        }
    }, [props.interface])

    return (
        <>
            <TextField variant="outlined" onChange={(e) => props.interface.directive('SetDuration', {"duration": e.target.value}) } 
                    id="duration" label="Duration" type="number" defaultValue={props.interface.duration.value ? props.interface.duration.value : 1} 
                    InputLabelProps={{ shrink: true, }} inputProps={{ style: {padding: 10 } }}  />
        </>
    );

}


