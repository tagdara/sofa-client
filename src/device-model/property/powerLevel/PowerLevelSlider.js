import React from 'react';
import CardLineSlider from 'components/CardLineSlider'
import usePowerLevel from 'device-model/property/powerLevel/usePowerLevel'

const PowerLevelSlider = props => {
    
    const { powerLevel, setPowerLevel } = usePowerLevel(props.endpointId, props.value, props.directive)
    if (powerLevel === undefined ) { return null }

    console.log('slider level', powerLevel)

    return ( 
        <CardLineSlider  minWidth={200} on={props.on} value={powerLevel} step={props.step ? props.step : 10} change={setPowerLevel} />
    );
}

export default PowerLevelSlider
