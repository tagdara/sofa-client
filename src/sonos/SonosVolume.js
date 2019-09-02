import React from 'react';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import SofaSlider from '../SofaSlider'
import ToggleAvatar from '../ToggleAvatar'

export default function SonosVolume(props) {

    const [volume, setVolume] = useState(props.player.SpeakerController.volume.value);
 
    function handlePreVolumeChange(event) {
        setVolume(event);
    }; 

    function handleVolumeChange(event) {
        props.player.SpeakerController.directive("SetVolume", { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.player.SpeakerController.directive("SetMute", { "mute" : !props.player.SpeakerController.mute.value } )
    }; 

    return (
        <ListItem >
            <ToggleAvatar noback={true} onClick={ () => handleMuteChange()} avatarState={ (!props.player.SpeakerController.mute.value && props.player.MusicController.playbackState.value=='PLAYING') ? 'on': 'off'}>
                { props.player.SpeakerController.mute.value  ? <VolumeOffIcon /> : <VolumeUpIcon /> }
            </ToggleAvatar>
            <SofaSlider unit={"%"} name={props.player.friendlyName} value={props.player.SpeakerController.volume.value } preChange={handlePreVolumeChange} change={handleVolumeChange} />
        </ListItem>
    );

}

