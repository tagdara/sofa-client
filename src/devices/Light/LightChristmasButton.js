import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ChristmasTreeIcon from 'resources/ChristmasTreeIcon';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => {
    return {
        treeOn: {
            backgroundColor: "rgba(255,255,0,0.1)"
        }
    }
})
const LightChristmasButton = React.memo(props => {

    const classes = useStyles();
    const treeEndpointId = 'insteon:node:1A F1 A5 1'
    const tree = props.deviceState[treeEndpointId]
    const treeOn = tree && tree.PowerController.powerState.value === 'ON'

    useEffect(() => {
        props.addEndpointIds('id', treeEndpointId, 'LightChristmasButton')
        return function cleanup() {
            props.unregisterDevices('LightChristmasButton');
        };
    // eslint-disable-next-line 
    }, [])   

    function toggleTree() {
        props.directive(treeEndpointId, 'PowerController', treeOn ? 'TurnOff' : 'TurnOn')
    }
    

    return (
        <IconButton className={treeOn ? classes.treeOn : classes.treeOff} onClick={()=>toggleTree() } >
            <ChristmasTreeIcon treeOn={ treeOn } />
        </IconButton>
    )

}, deviceStatesAreEqual);

export default dataFilter(LightChristmasButton);
