import React from 'react';
import ThermostatModeButtons from 'endpoint-model/property/thermostatMode/ThermostatModeButtons'
import ThermostatModeSegment from 'endpoint-model/property/thermostatMode/ThermostatModeSegment'

const ThermostatMode = props => {

    if (props.compact) {
        return <ThermostatModeSegment {...props} />
    }
    return (    
        <ThermostatModeButtons {...props} />
    )
}

export default ThermostatMode;