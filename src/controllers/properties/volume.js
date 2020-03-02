import React, { useEffect } from 'react';
import SmallSlider from '../../SmallSlider';

export default function Volume(props) {
    console.log( props.interface)
    
    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : 50 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
    
    function handleVolumeChange(event) {
        props.directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event }, {}, props.item.instance)
    }; 

    return (
        <SmallSlider
            value={ props.item.value ? props.item.value.volume : 50 } unit={"%"}
            min={0} max={100} step={10}
            change={ handleVolumeChange }
        />
    );
}

