import React from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider';

export default function PowerLevel(props) {

    function handlePowerLevelChange(event) {
        props.directive(props.device.endpointId, 'PowerLevelController', 'SetPowerLevel', { "powerLevel" : event }, {}, props.item.instance)

    }; 
    
    function valueOrDefault() {
        var val=50
        try {
            if (props.item.value.hasOwnProperty('powerLevel')) {
                val=parseInt(props.item.value.powerLevel)
            }
        } 
        catch {}
        return val
    }
    
    if (props.compact) {
        return valueOrDefault() + "%"
    }

    return (
        <SofaAvatarSlider avatarUnit={"%"} small={true} reverse={true} minWidth={64} value={ valueOrDefault() } change={ handlePowerLevelChange } />
    );
}

