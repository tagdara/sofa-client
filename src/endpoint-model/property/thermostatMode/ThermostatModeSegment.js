import React from 'react';
import SegmentMenu from 'layout/components/SegmentMenu'
import useThermostatMode from 'endpoint-model/property/thermostatMode/useThermostatMode'

export default function ThermostatModeSegment(props) {

    const { thermostatModeLabel, selections, setThermostatMode } = useThermostatMode(props.endpointId, props.value, props.directive)

    return  <SegmentMenu value={ thermostatModeLabel } selections={selections} select={setThermostatMode} />

}

