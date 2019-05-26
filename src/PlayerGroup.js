import React, { memo}  from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SpeakerIcon from '@material-ui/icons/Speaker';

import GridBreak from './GridBreak';
import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';

import Sonos from "./sonos/Sonos";

const useStyles = makeStyles({
    
    listDialogContent: {
        padding: 0,
    }

});

function PlayerGroup(props) {
    
    console.log('group', props, props.player, props.deviceProperties)

    const classes = useStyles();
    const isMobile = window.innerWidth <= 800;
    const speakers = props.devicesByCategory('SPEAKER')
    const device = props.deviceByEndpointId(props.player)
    
    console.log('group device', device)
    
    function isLinked(name) {

        if (name==props.player) return true
        if (props.deviceProperties.hasOwnProperty(props.player)) {
            if (props.deviceProperties[props.player].hasOwnProperty('linked')) {
                if (props.deviceProperties[props.player].linked.includes(name)) {
                    return true
                }
            }
        }
        return false
    }
    
    function handleAddRemove(endpointId, action) {
        if (action=='add') {
            var sonosinput=props.player
        } else {
            var sonosinput=''
        }
        props.sendAlexaCommand(name, endpointId, 'InputController', "SelectInput", { "input": sonosinput } )
    }; 


    return (    
        <React.Fragment>
            <GridBreak label={"Playing"} />
            { props.deviceProperties.hasOwnProperty(props.player) &&
                <Sonos small={true} setLayoutCard={props.setLayoutCard} setPlayer={props.setPlayer} sendAlexaCommand={props.sendAlexaCommand} 
                        devices={speakers} name={ device.friendlyName } player={ device } deviceProperties={ props.deviceProperties[device.endpointId] } linkedPlayers={ props.deviceProperties }/>
            }
            <GridBreak label={"In Group"} />
            { speakers.map(speaker =>
                isLinked(speaker.endpointId) &&
                    <GridItem key={speaker.endpointId} >
                        <ListItem>
                            <ToggleAvatar avatarState={"on"}><SpeakerIcon /></ToggleAvatar>
                            <ListItemText variant="body2" primary={speaker.friendlyName} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=> handleAddRemove(speaker.endpointId, 'remove') }>
                                    <RemoveIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </GridItem>
            )}
            <GridBreak label={"Other Players"} />
            { speakers.map(speaker =>
                !isLinked(speaker.endpointId) &&
                    <GridItem key={speaker.endpointId} >
                        <ListItem>
                            <ToggleAvatar avatarState={"off"}><SpeakerIcon /></ToggleAvatar>
                            <ListItemText variant="body2" primary={speaker.friendlyName} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=> handleAddRemove(speaker.endpointId, 'add') }>
                                    <AddIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </GridItem>
            )}

        </React.Fragment>
    )
};

export default withData(memo(PlayerGroup));