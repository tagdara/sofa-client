import React, { useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import SofaAvatarSlider from 'components/SofaAvatarSlider'
import { directive } from 'store/directive'
import { deviceByEndpointId } from 'store/deviceHelpers'

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'

const Speaker = props => {

    const speakerDevice = deviceByEndpointId(props.endpointId)   
    const speaker = useDeviceStateStore( state => state.deviceStates[props.endpointId])
    const name = speakerDevice.friendlyName ? shortName(speakerDevice.friendlyName) : ""
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

    useEffect(() => {
        register(props.endpointId, "speaker-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "speaker-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])

    
    if (!speaker || !speaker.PowerController || ( props.filterOff && speaker.PowerController.powerState.value==='OFF')) {
        //console.log('speaker is being filtered', props.filterOff, speaker)
        return null
    }

    function handleVolumeChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "mute" : !speaker.Speaker.mute.value } )
    }; 

    function togglePower(event) {
        directive(props.endpointId, 'PowerController', speaker.PowerController.powerState.value==='OFF' ? 'TurnOn' : 'TurnOff')
    };

    function shortName(name) {
        if (name.endsWith(" Speakers")) {
            return name.replace(" Speakers", "");
        }
        return name
    }

    return (
        <ListItem>
            <SofaAvatarSlider   label = { name } 
                                labelClick = { togglePower }
                                small = {true} reverse = {true} minWidth = { 64 } noPad = { true }
                                value = { speaker.Speaker.volume.value }
                                change = { handleVolumeChange } 
                                avatarClick={ () => handleMuteChange(!speaker.Speaker.mute.value)} 
                                avatarState={ speaker.PowerController.powerState.value==='ON' ? "on" : "off" }
                                disabled={ speaker.PowerController.powerState.value==='OFF' }
            />
        </ListItem>
    );
}

export default Speaker
