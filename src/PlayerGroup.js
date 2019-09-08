import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

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

export default function PlayerGroup(props) {

    const { devicesByCategory, deviceByEndpointId } = useContext(DataContext);
    const speakers = devicesByCategory('SPEAKER')
    const device = deviceByEndpointId(props.player)
    
    function isLinked(name) {

        if (name===props.player || device.MusicController.linked.value.includes(name)) {
            return true
        }
        return false
    }
    
    function handleAddRemove(speaker, action) {
        var sonosinput=''
        if (action==='add') {
            sonosinput=props.player
        }
        speaker.InputController.directive("SelectInput", { "input": sonosinput } )
    }; 

    return (    
        <React.Fragment>
            <GridBreak label={"Playing"} />
            <Sonos small={true} setPlayer={props.setPlayer} devices={speakers} name={ device.friendlyName } player={ device } />
            <GridBreak label={"In Group"} />
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
            <GridBreak label={"Other Players"} />
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
        </React.Fragment>
    )
};
