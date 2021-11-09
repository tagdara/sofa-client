import React from 'react';

import SmallSlider from 'components/SmallSlider';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
                disabled={!props.deviceState.PowerController.powerState.value==='ON'}
                />
            </TableCell>
        </TableRow>
    );

}


