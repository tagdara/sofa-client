import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ToggleChip from 'components/ToggleChip'
import { getModes } from 'store/deviceHelpers'

export default function ModeChips(props) {

    function handleModeChoice(event, mode, modechoice) {
        props.device[mode].directive('SetMode', { "mode": modechoice })
    }; 

    const deviceModes = getModes(props.device.endpointId)

    return (
        Object.keys(deviceModes).map(mode => 
            <ListItem key={mode}>
                <ListItemText primary={mode} key={mode} />
                { Object.keys(deviceModes[mode]).map(modechoice => 
                    <ToggleChip key = { modechoice } 
                                label = { deviceModes[mode][modechoice] } 
                                chipState = { props.device[mode].mode.value === modechoice ? "on" : "off" } 
                                onClick = { (e) => handleModeChoice(e, mode, modechoice) } 
                    />
                )}
            </ListItem>
        )
    )
}

ModeChips.defaultProps = {
  exclude: [],
};