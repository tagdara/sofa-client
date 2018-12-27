import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TvIcon from '@material-ui/icons/Tv';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';

import TvRemote from './TvRemote';
import TvDialog from './tvDialog';
import SofaCard from '../sofaCard';
import ToggleAvatar from '../ToggleAvatar'
import GridItem from '../GridItem'

const useStyles = makeStyles({
    
    list: {
        width: "100%"
    },
    xlistItem: {
        width: '100%',
        minHeight: 48,
        padding: "8 0",
    },
    xremoteListItem: {
        width: '100%',
        minHeight: 48,
        padding: 16,
    },
});

export default function Tv(props) {

    const classes = useStyles();
    const [powerState, setPowerState] = useState(props.deviceProperties.powerState);
    const [showDialog, setShowDialog] = useState(false)
    const [showRemote, setShowRemote] = useState(false)
 
    function toggleRemote() {
        setShowRemote(!showRemote)
    }
    function handleClickOpen() {
        setShowDialog(true);
    };  
    
    function closeDialog() { 
        setShowDialog(false)
    }   
 
    function handlePowerChange(event) {
        setPowerState(event.target.checked)
        if (event.target.checked) {
            props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'PowerController', 'TurnOn')
        } else {
            props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }; 
    
    return (
        <GridItem wide={props.wide} >
            <ListItem>
                <ToggleAvatar onClick={ () => handleClickOpen()} avatarState={ props.deviceProperties.powerState=='ON' ? 'on' : 'off' } ><TvIcon /></ToggleAvatar>
                <ListItemText primary={props.device.friendlyName} secondary={ props.deviceProperties.input } onClick={ () => handleClickOpen()}/>
                <ListItemSecondaryAction>
                    { props.deviceProperties.powerState!='ON' ? null :
                    <IconButton onClick={ () => toggleRemote() } >
                        <ControlCameraIcon />
                    </IconButton>
                    }
                    <Switch color="primary" checked={props.deviceProperties.powerState=='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>
            </ListItem>
            { showRemote ?
            <ListItem className={classes.remoteListItem}>
                <TvRemote endpointId={props.device.endpointId} name={props.device.friendlyName} sendAlexaCommand={props.sendAlexaCommand} />
            </ListItem>
            : null }
            <TvDialog sendAlexaCommand={props.sendAlexaCommand} open={showDialog} close={closeDialog} name={props.device.friendlyName} device={ props.device } deviceProperties={ props.deviceProperties } />
        </GridItem>
    );

}
