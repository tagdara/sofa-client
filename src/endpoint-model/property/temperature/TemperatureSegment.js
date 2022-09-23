import React from 'react';
import useTemperature from 'endpoint-model/property/temperature/useTemperature'
import SegmentPopover from 'layout/components/SegmentPopover'
import TemperatureSlider from 'endpoint-model/property/temperature/TemperatureSlider'

const TemperatureSegment = props => {

    const { temperatureLabel } = useTemperature(props.endpointId, props.value, props.directive)

    return (
        <SegmentPopover width={300} size={props.size} value={ temperatureLabel } popOver={<TemperatureSlider {...props} />} />
    );
}

export default TemperatureSegment;
