import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ContactSensor = props => {

    var detect = props.interface.detectionState.value === "DETECTED" ? "Detected" : "Not Detected"

    return (
        <TableRow>
            <TableCell>
                ContactSensor
            </TableCell>
            <TableCell>
                {detect}
            </TableCell>
            <TableCell>
            </TableCell>
        </TableRow>
    );

}

export default ContactSensor;


