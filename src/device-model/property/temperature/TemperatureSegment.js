import React from 'react';
import useTemperature from 'device-model/property/temperature/useTemperature'
import Segment from 'components/Segment'

const TemperatureAvatar = props => {
    
    const { temperatureLabel } = useTemperature(props.endpointId)

    return (
        <Segment>{ temperatureLabel }</Segment>
    );
}

export default TemperatureAvatar;
