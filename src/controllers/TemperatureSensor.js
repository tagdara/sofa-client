import React from 'react';
import { makeStyles } from '@material-ui/styles';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

