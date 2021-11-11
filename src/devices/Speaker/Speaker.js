import React, { useEffect } from 'react';

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineSlider from 'components/CardLineSlider';

import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'
import useDeviceStateStore from 'store/deviceStateStore'


const Speaker = props => {

    const speakerDevice = deviceByEndpointId(props.endpointId)   
    const speaker = useDeviceStateStore( state => state.deviceStates[props.endpointId])

    useEffect(() => {
        register(props.endpointId, "speaker-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "speaker-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])

    
    if (!speaker || !speaker.PowerController ) {
        //console.log('speaker is being filtered', props.filterOff, speaker)
        return null
    }

    const name = shortName(speakerDevice.friendlyName)
    const on = speaker.PowerController.powerState.value==='ON'

    if (props.filterOff && speaker.PowerController.powerState.value==='OFF') {
        return null
    }

    function handleVolumeChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 

    //function handleMuteChange(event) {
    //    directive(props.endpointId, 'Speaker', 'SetVolume', { "mute" : !speaker.Speaker.mute.value } )
    //}; 

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
        <CardLine inList={props.inList}>
            <CardLineText primary={name} onClick={ togglePower } width={"30%"} />
            <CardLineSlider value = { speaker.Speaker.volume.value } on={on} set={handleVolumeChange} width={"60%"}/>         
        </CardLine>
    );
}

export default Speaker
