import React from 'react';
import { makeStyles } from '@mui/styles';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles({
        
    nobreak: {
        whiteSpace: "nowrap",
        alignItems: "center",
    }
});

const TemperatureSensor = props => {
    
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell>
                Temperature Sensor
            </TableCell>
            <TableCell>{props.interface.temperature.deepvalue+"°"}</TableCell>
            <TableCell className={classes.nobreak} >
            </TableCell>
        </TableRow>
    );
}

export default TemperatureSensor;

