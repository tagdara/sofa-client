import React from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider'

export default function PlayerVolume(props) {
    
    function handleVolumeChange(event) {
        props.directive(props.device.endpointId, "Speaker", "SetVolume", { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.directive(props.device.endpointId, "Speaker", "SetMute", { "mute" : !props.deviceState.Speaker.mute.value } )
    }; 

    return (
        <SofaAvatarSlider label={props.device.friendlyName} small={true} reverse={true} minWidth={64} value={props.deviceState.Speaker.volume.value } change={handleVolumeChange} 
            avatarClick={handleMuteChange}
        />
    );

}

