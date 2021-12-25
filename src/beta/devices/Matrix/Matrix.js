import React, { useEffect } from 'react';
import ModeSelect from "beta/device-model/controller/ModeController/ModeSelect";

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'
import { Group, Text } from '@mantine/core';

const Matrix = props => {

    const matrixDevice = useDeviceStore( state => state.devices[props.endpointId] )
    const matrixState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = matrixDevice.friendlyName

    useEffect(() => {
        register(props.endpointId, 'Matrix-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Matrix-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])  

    if (!matrixState) { return null }

    function changeMode(modeId) {
        directive(props.endpointId, "ModeController", 'SetMode', { "mode": modeId }, {}, 'Matrix.Input' )
    }; 

    //const on = matrixState.Input.mode.value !== 'Blank'
        
    return (
        <Group position="apart" noWrap style={{ width: "100%"}}>
            <Text lineClamp={1} size="sm">{name }</Text>
            <ModeSelect instance={"Input"} half
                        endpointId={props.endpointId} 
                        select={changeMode} 
                        value={ matrixState.Input.mode.value }/>
        </Group>
    );
}

export default Matrix;

