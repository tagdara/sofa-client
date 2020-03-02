import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function PowerLevel(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'PowerLevelController', 'SetPowerLevel', { "powerLevel" : 50 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
    
    function handlePowerLevelChange(event) {
        props.directive(props.device.endpointId, 'PowerLevelController', 'SetPowerLevel', { "powerLevel" : event }, {}, props.item.instance)

    }; 

    return (
        <SmallSlider
            value={ parseInt(props.item.value.powerLevel) } unit={"%"}
            min={0} max={100} step={10}
            change={ handlePowerLevelChange }
        />
    );
}

