import React from 'react';
import { makeStyles } from '@material-ui/styles';

import SmallSlider from 'components/SmallSlider';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

const Speaker = props => {
    
    const classes = useStyles();

    function handleVolumeChange(event) {
        props.interface.directive('SetVolume', { "volume" : event })
    }; 

    const on = (props.deviceState &&  props.deviceState.PowerController) ? props.deviceState.PowerController.powerState.value : true

    return (
        <>
            <TableRow>
                <TableCell>
                    Volume
                </TableCell>
                <TableCell>{props.interface.volume.value+"%"}</TableCell>
                <TableCell className={classes.nobreak} >
                    <SmallSlider
                        value={props.interface.volume.value}
                        min={0} max={100} step={10}
                        change={handleVolumeChange}
                        disabled={!on}
                    />
                </TableCell>
            </TableRow>
        </>
    );
}
export default Speaker;
