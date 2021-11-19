import React from 'react';
import { getModes, deviceByEndpointId, isModeNonControllable } from 'store/deviceHelpers';
import { makeStyles } from '@mui/styles';

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const useStyles = makeStyles(theme => {
    
    return {    
        titleBar: {
            width: "100%",
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
        },
        select: {
            minWidth: "50%",
        },
        modeGroup: {
            width: "100%",
        }
    }

});

export default function ModeLines(props) {

    const classes = useStyles();
    const device = deviceByEndpointId(props.device.endpointId)
    const modes = getModes(device, props.exclude)
    
    function handleModeChoice(event, mode, modechoice) {
        props.directive(props.device.endpointId, mode, 'SetMode', { "mode": modechoice })
    }; 

    if (!modes) { return null }

    return (
        <>
            { Object.keys(modes).map(mode => 
                <CardLine key={mode} inList={true}  >
                    <CardLineText primary={mode} key={mode} />
                    <Select disabled={props.disabled || isModeNonControllable(device,mode)} className={classes.select} displayEmpty variant={"standard"}
                            value={props.deviceState[mode].mode.value ? props.deviceState[mode].mode.value : ""} 
                            onChange={ (e) => handleModeChoice(e, mode, e.target.value)} >
                        { Object.keys(modes[mode]).map(modechoice => 
                            <MenuItem key = { modes[mode][modechoice] } value={modechoice}>{modes[mode][modechoice]}</MenuItem>
                        )}
                    </Select>
                </CardLine>
            )}
        </>
    )
}