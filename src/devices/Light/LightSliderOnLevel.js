import React from 'react';
import SofaAvatarSlider from 'components/SofaAvatarSlider';
import LightPropertyPlaceholder from 'devices/Light/LightPropertyPlaceholder';

const LightSliderOnLevel = props => {

    function handleOnLevelChange(event) {
        props.directive(props.endpointId,'RangeController', 'SetRangeValue', { "rangeValue" : event }, {}, "Light.On Level")
    }; 

    if (props.hide || !props.deviceState || !props.deviceState['On Level'] ) {
        if (props.placeholder) {
            return <LightPropertyPlaceholder />
        }
        return null
    }

    const onLevel = props.deviceState['On Level'].rangeValue.value

    return (
        <SofaAvatarSlider   label={"On Level"} 
            small={true} reverse={true} minWidth={64} smallText={true}
            value={ onLevel }
            min={0} max={100} step={10} change={handleOnLevelChange}
        />
    );
}

export default LightSliderOnLevel;
