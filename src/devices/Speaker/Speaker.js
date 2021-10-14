import React, { useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import SofaAvatarSlider from 'components/SofaAvatarSlider'


const Speaker = React.memo(props => {

    const directive = props.directive
    const speaker = props.deviceState[props.endpointId]
    const name = props.devices[props.endpointId] ? shortName(props.devices[props.endpointId].friendlyName) : ""

    useEffect(() => {
        props.addEndpointIds('id',props.endpointId,'speaker')
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
                                labelClick = {togglePower}
                                small = {true} reverse = {true} minWidth = { 64 } noPad = { true }
                                value = { speaker.Speaker.volume.value }
                                change = {handleVolumeChange} 
                                avatarClick={ () => handleMuteChange(!speaker.Speaker.mute.value)} 
                                avatarState={ speaker.PowerController.powerState.value==='ON' ? "on" : "off" }
                                disabled={ speaker.PowerController.powerState.value==='OFF' }
            />
        </ListItem>
    );
}, deviceStatesAreEqual);

export default dataFilter(Speaker)
