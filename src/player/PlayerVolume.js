import React from 'react';
import SofaAvatarSlider from '../SofaAvatarSlider'

export default function PlayerVolume(props) {
    
    function handleVolumeChange(event) {
        props.player.SpeakerController.directive("SetVolume", { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.player.SpeakerController.directive("SetMute", { "mute" : !props.player.SpeakerController.mute.value } )
    }; 

    return (
        <SofaAvatarSlider label={props.player.friendlyName} small={true} reverse={true} minWidth={64} value={props.player.SpeakerController.volume.value } change={handleVolumeChange} 
            avatarClick={handleMuteChange}
        />
    );

}

