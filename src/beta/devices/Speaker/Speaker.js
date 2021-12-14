import React, { useEffect } from 'react';
import { ThemeIcon, Group, Text } from '@mantine/core';
import CardLineSlider from 'beta/components/CardLineSlider';

import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'
import useDeviceStateStore from 'store/deviceStateStore'
import { Speaker as SpeakerIcon } from 'react-feather'

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

    function handleVolumeChange(vol) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : vol} )
    }; 

    //function handleMuteChange(event) {
    //    directive(props.endpointId, 'Speaker', 'SetVolume', { "mute" : !speaker.Speaker.mute.value } )
    //}; 

    function togglePower() {
        directive(props.endpointId, 'PowerController', speaker.PowerController.powerState.value==='OFF' ? 'TurnOn' : 'TurnOff')
    };

    function shortName(name) {
        if (name.endsWith(" Speakers")) {
            return name.replace(" Speakers", "");
        }
        return name
    }

    return (
        <Group direction="row" noWrap grow>
            <Group style={{ width: "40%"}}>
                <ThemeIcon size="lg" variant={on ? "filled" : "light"} radius="md" onClick={togglePower}>
                    <SpeakerIcon size={20} />
                </ThemeIcon>
                <Text weight={400} lineClamp={1} size="lg">
                    {name}
                </Text>
            </Group>
            <CardLineSlider value = { speaker.Speaker.volume.value } on={on} change={handleVolumeChange} width={"60%"}/>         
        </Group>
    );
}

export default Speaker
