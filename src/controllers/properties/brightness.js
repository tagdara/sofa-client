import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function Brightness(props) {

    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'BrightnessController', 'SetBrightness', { "brightness" : 50 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
 
   
    function handleBrightnessChange(event) {
        props.directive(props.device.endpointId, 'BrightnessController', 'SetBrightness', { "brightness" : event }, {}, props.item.instance)
    }; 

    return (
        <SmallSlider
            value={ props.item.value ? props.item.value.brightness : 50 } unit={"%"}
            min={0} max={100} step={10}
            change={ handleBrightnessChange }
        />
    );
}

