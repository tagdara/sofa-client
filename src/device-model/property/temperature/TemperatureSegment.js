import React from 'react';
import useTemperature from 'device-model/property/temperature/useTemperature'
import SegmentPopover from 'components/SegmentPopover'
import TemperatureAvatar from 'device-model/property/temperature/TemperatureAvatar'

const TemperatureSegment = props => {
    
    const { temperatureLabel } = useTemperature(props.endpointId)

    return (
        <SegmentPopover value={ temperatureLabel } popOver={<TemperatureAvatar {...props} />} />
    );
}

export default TemperatureSegment;
