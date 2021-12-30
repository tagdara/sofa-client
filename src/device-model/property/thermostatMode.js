import React from 'react';
import ThermostatModeButtons from 'device-model/property/thermostatMode/ThermostatModeButtons'
import ThermostatModeSegment from 'device-model/property/thermostatMode/ThermostatModeSegment'

const ThermostatMode = props => {

    if (props.compact) {
        return <ThermostatModeSegment {...props} />
    }
    return (    
        <ThermostatModeButtons {...props} />
    )
}

export default ThermostatMode;