import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from 'DataContext/DeviceProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TvIcon from '@material-ui/icons/Tv';

import GridItem from 'components/GridItem';
import ToggleAvatar from 'components/ToggleAvatar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => {
    
    return {    
        select: {
            minWidth: "30%",
        }
    }

});

export default function Matrix(props) {
    
    const classes = useStyles();
    const { getInputs} = useContext(DeviceContext);
    
    function handleInput(event, inputname) {
        var result = props.directive(props.device.endpointId, "InputController", 'SelectInput', { "input": inputname } )
        console.log('rezzzz', result)
    }; 
        
    return (
        <GridItem >
            <ListItem>
                <ToggleAvatar noback={true} avatarState={props.deviceState.InputController.input.value!=='Blank' ? 'on': 'off'}><TvIcon /></ToggleAvatar>
                <ListItemText primary={props.device.friendlyName} />
                <Select className={classes.select} displayEmpty value={props.deviceState.InputController.input.value ? props.deviceState.InputController.input.value : ""} onChange={ (e) => handleInput(e, e.target.value) } >
                    { getInputs(props.device).map(inp =>
                        <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                    )}
                </Select>
            </ListItem>
        </GridItem>
    );
}

