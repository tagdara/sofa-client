import React from 'react';
import { makeStyles } from '@mui/styles';

import SmallSlider from 'components/SmallSlider';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    },
    nobreak: {
        whiteSpace: "nowrap",
        alignItems: "center",
    }
});

export default function BrightnessController(props) {
    
    const classes = useStyles();

    function handleBrightnessChange(event) {
        props.interface.directive('SetBrightness', { "brightness" : event })
    }; 

    return (
        <TableRow>
            <TableCell>
                Brightness
            </TableCell>
            <TableCell>{props.interface.brightness.value+"%"}</TableCell>
            <TableCell className={classes.nobreak} >
                <SmallSlider
                    value={props.interface.brightness.value}
                    min={0} max={100} step={10}
                    change={handleBrightnessChange}
                    disabled={!props.deviceState.PowerController.powerState.value}
                />
            </TableCell>
        </TableRow>
    );
}

