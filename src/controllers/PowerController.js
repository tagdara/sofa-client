import React from 'react';

import Switch from '@material-ui/core/Switch';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function PowerController(props) {

    function handlePowerChange(event){
        if (event.target.checked) {
            props.interface.directive('TurnOn')
        } else {
            props.interface.directive('TurnOff')
        }
    };     
    
    function isReachable() {
        if (props.device.hasOwnProperty('EndpointHealth')) {
            if (props.deviceState.EndpointHealth.connectivity.value.value==='OK') { return true }
            return false
        }
        console.log('no endpoint health', props.device)
        return true
    }

    return (
        <TableRow>
            <TableCell>
                Power
            </TableCell>
            <TableCell>
                {props.interface.powerState.value}
            </TableCell>
            <TableCell>
                { isReachable() &&
                    <Switch color="primary" checked={props.interface.powerState.value==='ON'} onChange={handlePowerChange} />
                }
            </TableCell>
        </TableRow>
    );

}


