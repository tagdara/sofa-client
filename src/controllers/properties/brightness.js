import React, { useEffect } from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider';

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
    
    if (props.compact) {
        return <div>{ props.item.value ? props.item.value.brightness : 50 }</div>
    }

    return (
        <SofaAvatarSlider small={true} reverse={true} minWidth={64} value={ props.item.value ? props.item.value.brightness : 50 } change={ handleBrightnessChange } />
    );
}

