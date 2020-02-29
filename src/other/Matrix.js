import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from '../DataContext/DeviceProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TvIcon from '@material-ui/icons/Tv';

import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar';
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
    const { deviceByEndpointId, directive, getInputs} = useContext(DeviceContext);
    const device=deviceByEndpointId(props.device.endpointId)
    const inputs=getInputs(device)   
    
    function handleInput(event, inputname) {
        directive(props.device.endpointId, "InputController", 'SelectInput', { "input": inputname } )
    }; 
        
    return (
        <GridItem >
            <ListItem>
                <ToggleAvatar avatarState={'on'}><TvIcon /></ToggleAvatar>
                <ListItemText primary={props.device.friendlyName} />
                <Select className={classes.select} displayEmpty value={props.device.InputController.input.value ? props.device.InputController.input.value : ""} onChange={ (e) => handleInput(e, e.target.value) } >
                    { inputs.map(inp =>
                        <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                    )}
                </Select>
            </ListItem>
        </GridItem>
    );
}

