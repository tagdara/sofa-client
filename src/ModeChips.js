import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ToggleChip from './ToggleButton'

export default function ModeChips(props) {

    function handleModeChoice(event, mode, modechoice) {
        props.device[mode].directive('SetMode', { "mode": modechoice })
    }; 

    function getModes() {
        
        var modes={}
        for (var k = 0; k < props.device.interfaces.length; k++) {
            if (props.device[props.device.interfaces[k]].controller==='ModeController') {
                var mc=props.device[props.device.interfaces[k]]
                var modename=mc.capabilityResources.friendlyNames[0].value.text
                if (props.exclude && !props.exclude.includes(modename)) {
                    var modechoices=[]
                    for (var j = 0; j < mc.configuration.supportedModes.length; j++) {
                        modechoices[mc.configuration.supportedModes[j].value] = mc.configuration.supportedModes[j].modeResources.friendlyNames[0].value.text
                    }
                    modes[modename]=modechoices
                }
            }
        }
        return modes
    }
   
    return (
        Object.keys(getModes()).map(mode => 
            <ListItem key={mode}>
                <ListItemText primary={mode} key={mode} />
                { Object.keys(getModes()[mode]).map(modechoice => 
                    <ToggleChip key = { modechoice } label = { getModes()[mode][modechoice] } chipState={ props.device[mode].mode.value===modechoice ? "on" : "off"} onClick={ (e) => handleModeChoice(e, mode, modechoice)} />
                )}
            </ListItem>
        )
    )
}

ModeChips.defaultProps = {
  exclude: [],
};