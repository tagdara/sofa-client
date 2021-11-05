import React from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider'
import { directive } from 'store/directive'
import { deviceByEndpointId } from 'store/deviceHelpers'
import useDeviceStateStore from 'store/deviceStateStore'

export default function PlayerVolume(props) {

    const device = deviceByEndpointId(props.endpointId)
    const deviceState = useDeviceStateStore(state => state.deviceStates[props.endpointId])

    function handleVolumeChange(event) {
        directive(props.endpointId, "Speaker", "SetVolume", { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        directive(props.endpointId, "Speaker", "SetMute", { "mute" : !deviceState.Speaker.mute.value } )
    }; 

    return (
        <SofaAvatarSlider label={device.friendlyName} small={true} reverse={true} minWidth={64} value={deviceState.Speaker.volume.value } change={handleVolumeChange} 
            avatarClick={handleMuteChange}
        />
    );

}

