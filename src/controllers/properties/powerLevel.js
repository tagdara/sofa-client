import React, { useState, useEffect } from 'react';
import CardLineSlider from 'components/CardLineSlider';
import PowerLevelAvatar from 'controllers/PowerLevelController/PowerLevelAvatar'

export default function PowerLevel(props) {

    const [ displayValue, setDisplayValue ] = useState( valueOrDefault())

    useEffect(() => {
        setDisplayValue(valueOrDefault())
    // eslint-disable-next-line
    }, [ props.item ])


    function handleChange(event) {
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
        <>
            <CardLineSlider min={60} max={90} small={true}  value={ valueOrDefault() } slide={setDisplayValue} set={ handleChange } />
            <PowerLevelAvatar size="small" value={ displayValue } />
        </>
    );
}

