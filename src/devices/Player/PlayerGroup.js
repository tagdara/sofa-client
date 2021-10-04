import React, { useContext } from 'react';
import { DataContext } from 'DataContext/DataProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SpeakerIcon from '@material-ui/icons/Speaker';

import GridSection from 'components/GridSection';
import GridItem from 'components/GridItem';
import ToggleAvatar from 'components/ToggleAvatar';

import PlayerBase from "./player/PlayerBase";


export default function PlayerGroup(props) {

    const { directive, deviceStatesByCategory, deviceStateByEndpointId } = useContext(DataContext);
    const speakers = deviceStatesByCategory('SPEAKER')
    const device = deviceStateByEndpointId(props.player)
    
    function isLinked(name) {

        if (name===props.player || device.MusicController.linked.value.includes(name)) {
            return true
        }
        return false
    }
    
    function handleAddRemove(speaker, action) {
        var playerinput=''
        console.log('device',device)
        if (action==='add') {
            playerinput=device.friendlyName
        }
        directive(speaker.endpointId, 'InputController', 'SelectInput', { "input": playerinput })
        //speaker.InputController.directive("SelectInput", { "input": playerinput } )
    }; 

    return (    
        <React.Fragment>
            <GridSection name={"Group Coordinator"} >
            <PlayerBase small={true} setPlayer={props.setPlayer} devices={speakers} name={ device.friendlyName } player={ device } />
            </GridSection>
            <GridSection name={"In Group"}>
            { speakers.map(speaker =>
                isLinked(speaker.endpointId) &&
                    <GridItem key={speaker.endpointId} >
                        <ListItem>
                            <ToggleAvatar avatarState={"on"}><SpeakerIcon /></ToggleAvatar>
                            <ListItemText variant="body2" primary={speaker.friendlyName} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=> handleAddRemove(speaker, 'remove') }>
                                    <RemoveIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </GridItem>
            )}
            </GridSection>
            <GridSection name={"Other Players"}>
            { speakers.map(speaker =>
                !isLinked(speaker.endpointId) &&
                    <GridItem key={speaker.endpointId} >
                        <ListItem>
                            <ToggleAvatar avatarState={"off"}><SpeakerIcon /></ToggleAvatar>
                            <ListItemText variant="body2" primary={speaker.friendlyName} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=> handleAddRemove(speaker, 'add') }>
                                    <AddIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </GridItem>
            )}
            </GridSection>
        </React.Fragment>
    )
};
