import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TvIcon from '@material-ui/icons/Tv';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import ToggleAvatar from 'components/ToggleAvatar';
import ItemBase from "components/ItemBase";
import ModeSelect from "devices/Mode/ModeSelect";

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

const Matrix = React.memo(props => {

    const classes = useStyles();

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'Matrix-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('Matrix-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])

    if (!props.deviceState || !props.deviceState[props.endpointId]) { return null }

    const matrixState = props.deviceState[props.endpointId]
    const matrixDevice = props.devices[props.endpointId]    
    const name = matrixDevice.friendlyName

    function changeMode(modeId) {
        props.directive(props.endpointId, "ModeController", 'SetMode', { "mode": modeId }, {}, 'Matrix.Input' )
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
}, deviceStatesAreEqual);

export default dataFilter(Matrix);

