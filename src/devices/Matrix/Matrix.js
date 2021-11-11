import React, { useEffect } from 'react';
import TvIcon from '@mui/icons-material/Tv';

import ItemBase from "components/ItemBase";
import ModeSelect from "devices/Mode/ModeSelect";

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'


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
        
    return (
        <ItemBase itemType={props.itemType}>
            <CardLine>
                <CardLineIcon avatarState={matrixState.Input.mode.value !== 'Blank' ? 'on': 'off'}><TvIcon /></CardLineIcon>
                <CardLineText primary={ name } />
                <ModeSelect mode={"Input"} endpointId={props.endpointId} select={changeMode} value={ matrixState.Input.mode.value }/>
            </CardLine>
        </ItemBase>
    );
}

export default Matrix;

