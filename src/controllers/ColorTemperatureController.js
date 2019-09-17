import React from 'react';

import SmallSlider from '../SmallSlider';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function ColorTemperatureController(props) {

    function handleColorTemperatureChange(value) {
        props.interface.directive('SetColorTemperature', { "colorTemperatureInKelvin": value} )
    }; 

    return (
        <TableRow>
            <TableCell>
                Temperature
            </TableCell>
            <TableCell>
                {props.interface.colorTemperatureInKelvin.value}
            </TableCell>
            <TableCell>
                <SmallSlider
                value={props.interface.colorTemperatureInKelvin.value}
                min={2000} max={7000} step={100}
                change={handleColorTemperatureChange}
                disabled={!props.device.PowerController.powerState.value==='ON'}
                />
            </TableCell>
        </TableRow>
    );

}


