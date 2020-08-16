import React from 'react';
import SofaAvatarSlider from '../SofaAvatarSlider'

export default function PlayerVolume(props) {
    
    function handleVolumeChange(event) {
        props.directive(props.player.endpointId, "SpeakerController", "SetVolume", { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.directive(props.player.endpointId, "SpeakerController", "SetMute", { "mute" : !props.player.SpeakerController.mute.value } )
    }; 

    return (
        <SofaAvatarSlider label={props.name} small={true} reverse={true} minWidth={64} value={props.player.SpeakerController.volume.value } change={handleVolumeChange} 
            avatarClick={handleMuteChange}
        />
    );

}

