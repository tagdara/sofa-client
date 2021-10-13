import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const MotionSensor = props => {

    var detect = props.interface.detectionState.value === "DETECTED" ? "Detected" : "Not Detected"

    return (
        <TableRow>
            <TableCell>
                Motion Sensor
            </TableCell>
            <TableCell>
                {detect}
            </TableCell>
            <TableCell>
            </TableCell>
        </TableRow>
    );

}

export default MotionSensor;

