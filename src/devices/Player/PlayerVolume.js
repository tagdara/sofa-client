import React from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider'

export default function PlayerVolume(props) {
    
    function handleVolumeChange(event) {
        props.directive(props.device.endpointId, "SpeakerController", "SetVolume", { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.directive(props.device.endpointId, "SpeakerController", "SetMute", { "mute" : !props.deviceState.SpeakerController.mute.value } )
    }; 

    return (
        <SofaAvatarSlider label={props.device.friendlyName} small={true} reverse={true} minWidth={64} value={props.deviceState.SpeakerController.volume.value } change={handleVolumeChange} 
            avatarClick={handleMuteChange}
        />
    );

}

