import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import TvIcon from '@mui/icons-material/Tv';

import ToggleAvatar from 'components/ToggleAvatar';
import ItemBase from "components/ItemBase";
import ModeSelect from "devices/Mode/ModeSelect";

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    
    return {    
        select: {
            minWidth: "30%",
        },
        flex: {
            display: "flex",
            flexGrow: 1,
        },
    }

});

const Matrix = props => {

    const classes = useStyles();
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
            <ListItem className={classes.flex}>
                <ToggleAvatar noback={true} avatarState={matrixState.Input.mode.value !== 'Blank' ? 'on': 'off'}><TvIcon /></ToggleAvatar>
                <ListItemText className={classes.flex} primary={ name } />
                <ModeSelect mode={"Input"} endpointId={props.endpointId} select={changeMode} value={ matrixState.Input.mode.value }/>
            </ListItem>
        </ItemBase>
    );
}

export default Matrix;

