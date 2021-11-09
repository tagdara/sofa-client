import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';


const ToggleController = props => {
    
    const name = props.instance.split('.')[1]

    function handleToggleChange(event){
        if (event.target.checked) {
            props.interface.directive('TurnOn')
        } else {
            props.interface.directive('TurnOff')
        }
    };     

    return (
        <TableRow>
            <TableCell>
                { name }
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
                {props.interface.toggleState.value}
            </TableCell>
            <TableCell>
                <Switch color="primary" checked={props.interface.toggleState.value==='ON'} onChange={handleToggleChange} />
            </TableCell>
        </TableRow>
    );
}

export default ToggleController;

