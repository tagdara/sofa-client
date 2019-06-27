import React from 'react';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import SofaSlider from '../SofaSlider'
import ToggleAvatar from '../ToggleAvatar'

export default function SonosVolume(props) {

    const [volume, setVolume] = useState(props.deviceProperties.volume);
 
    function handlePreVolumeChange(event) {
        setVolume(event);
    }; 

    function handleVolumeChange(event) {
        props.sendAlexaCommand(props.name, props.endpointId, 'SpeakerController', "SetVolume", { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.sendAlexaCommand(props.name, props.endpointId, 'SpeakerController',"SetMute", { "muted" : !props.deviceProperties.muted } )
    }; 

    return (
        <ListItem >
            <ToggleAvatar noback={true} onClick={ () => handleMuteChange()} avatarState={ (!props.deviceProperties.muted && props.deviceProperties.playbackState=='PLAYING') ? 'on': 'off'}>
                { props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
            </ToggleAvatar>
            <SofaSlider unit={"%"} name={props.name} value={props.deviceProperties.volume} preChange={handlePreVolumeChange} change={handleVolumeChange} />
        </ListItem>
    );

}

