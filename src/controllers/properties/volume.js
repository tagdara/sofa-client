import React, { useEffect } from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider';

export default function Volume(props) {
    
    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'Speaker', 'SetVolume', { "volume" : 50 }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
    
    function handleVolumeChange(event) {
        props.directive(props.device.endpointId, 'Speaker', 'SetVolume', { "volume" : event }, {}, props.item.instance)
    }; 

    return (
        <SofaAvatarSlider small={true} reverse={true} minWidth={64} value={ props.item.value ? props.item.value.volume : 50 } change={ handleVolumeChange } />
    );
}

