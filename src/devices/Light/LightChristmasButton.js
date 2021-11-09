import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import ChristmasTreeIcon from 'resources/ChristmasTreeIcon';
import IconButton from '@mui/material/IconButton';

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {
        treeOn: {
            backgroundColor: "rgba(255,255,0,0.1)"
        }
    }
})
const LightChristmasButton = props => {

    const classes = useStyles();
    const treeEndpointId = 'insteon:node:1A F1 A5 1'
    const tree = useDeviceStateStore( state => state.deviceStates[treeEndpointId] )
    const treeOn = tree && tree.PowerController.powerState.value === 'ON'

    useEffect(() => {
        register(treeEndpointId, "xmasLight"+treeEndpointId)
        return function cleanup() {
            unregister(treeEndpointId, "xmasLight"+treeEndpointId);
        };
    // eslint-disable-next-line 
    }, [])  

    function toggleTree() {
        directive(treeEndpointId, 'PowerController', treeOn ? 'TurnOff' : 'TurnOn')
    }
    

    return (
        <IconButton className={treeOn ? classes.treeOn : classes.treeOff} onClick={()=>toggleTree() } >
            <ChristmasTreeIcon treeOn={ treeOn } />
        </IconButton>
    )

}

export default LightChristmasButton;
