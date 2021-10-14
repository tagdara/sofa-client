import React from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider'

const ComputerVolume = props => {

    function handleVolumeChange(event) {
        props.directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.directive(props.endpointId, 'Speaker', 'SetMute', { "mute" : !props.Speaker.mute.value } )
    }; 
    
    return (
        <SofaAvatarSlider   label={"Volume"} 
                            small={ true } reverse={ true } minWidth={64} 
                            value={ props.Speaker.volume.value }
                            change={ handleVolumeChange } 
                            avatarClick={ () => handleMuteChange(!props.Speaker.mute.value)} 
                            avatarState={ props.Speaker.mute.value===false ? "on" : "off" }
                            disabled={ props.disabled }
        />
    );
}

export default ComputerVolume;
