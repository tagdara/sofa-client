import React from 'react';

import SofaAvatarSlider from 'components/SofaAvatarSlider';

export default function LightSliderOnLevel(props) {

    function handleOnLevelChange(event) {
        props.directive(props.device.endpointId,'RangeController', 'SetRangeValue', { "rangeValue" : event }, {}, "Light.On Level")
    }; 

    return (
        <SofaAvatarSlider   label={"On Level"} 
            small={true} reverse={true} minWidth={64} smallText={true}
            value={props.deviceState['On Level'].rangeValue.value}
            min={0} max={100} step={10} change={handleOnLevelChange}
        />
    );
}

