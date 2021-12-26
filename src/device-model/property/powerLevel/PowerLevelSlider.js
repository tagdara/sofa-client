import React from 'react';
import CardLineSlider from 'components/CardLineSlider'
import usePowerLevel from 'device-model/property/powerLevel/usePowerLevel'

const PowerLevelSlider = props => {
    
    const { powerLevel, setPowerLevel } = usePowerLevel(props.endpointId, props.value, props.directive)
    if (powerLevel === undefined ) { return null }

    return ( 
        <CardLineSlider minWidth={200} on={true} value={powerLevel} step={10} change={setPowerLevel} />
    );
}

export default PowerLevelSlider
