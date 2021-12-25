import React from 'react';
import { ThemeIcon, Group, Text } from '@mantine/core';
import CardLineSlider from 'beta/components/CardLineSlider';
import { directive } from 'store/directive'
import { Speaker as SpeakerIcon } from 'react-feather'
import { useRegister } from 'store/useRegister'

const Speaker = props => {

    const { device, deviceState } = useRegister(props.endpointId)

    if (!deviceState || !deviceState.PowerController ) {
        return null
    }

    const name = shortName(device.friendlyName)
    const on = deviceState.PowerController.powerState.value==='ON'

    if (props.filterOff && deviceState.PowerController.powerState.value==='OFF') {
        return null
    }

    function handleVolumeChange(vol) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : vol} )
    }; 

    //function handleMuteChange(event) {
    //    directive(props.endpointId, 'Speaker', 'SetVolume', { "mute" : !speaker.Speaker.mute.value } )
    //}; 

    function togglePower() {
        console.log('tp',on)
        directive(props.endpointId, 'PowerController', on ? 'TurnOff' : 'TurnOn')
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
            <CardLineSlider value = { deviceState.Speaker.volume.value } on={on} change={handleVolumeChange} width={"60%"}/>         
        </Group>
    );
}

export default Speaker
