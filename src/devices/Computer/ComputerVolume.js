import React from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider'

const ComputerVolume = props => {

    function handleVolumeChange(event) {
        props.directive(props.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.directive(props.endpointId, 'SpeakerController', 'SetMute', { "mute" : !props.speakerController.mute.value } )
    }; 
    
    return (
        <SofaAvatarSlider   label={"Volume"} 
                            small={ true } reverse={ true } minWidth={64} 
                            value={ props.speakerController.volume.value }
                            change={ handleVolumeChange } 
                            avatarClick={ () => handleMuteChange(!props.speakerController.mute.value)} 
                            avatarState={ props.speakerController.mute.value===false ? "on" : "off" }
                            disabled={ props.disabled }
        />
    );
}

export default ComputerVolume;
