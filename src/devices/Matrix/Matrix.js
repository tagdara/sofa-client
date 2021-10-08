import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import TvIcon from '@material-ui/icons/Tv';

import { nested } from 'components/Nested';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import { DeviceContext } from 'context/DeviceContext';

import ToggleAvatar from 'components/ToggleAvatar';


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
    const { getInputs } = useContext(DeviceContext);

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

    function handleInput(event, inputname) {
        props.directive(props.endpointId, "InputController", 'SelectInput', { "input": inputname } )
    }; 
        
    return (
        <ListItem className={classes.flex}>
            <ToggleAvatar noback={true} avatarState={matrixState.InputController.input.value !== 'Blank' ? 'on': 'off'}><TvIcon /></ToggleAvatar>
            <ListItemText className={classes.flex} primary={ name } />
            <Select className={classes.select} displayEmpty 
                    value={ matrixState.InputController.input.value ? matrixState.InputController.input.value : ""} 
                    onChange={ (e) => handleInput(e, e.target.value) } >
                { getInputs(matrixDevice).map(inp =>
                    <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                )} 
            </Select>
        </ListItem>
    );
}, deviceStatesAreEqual);

export default nested(dataFilter(Matrix));

