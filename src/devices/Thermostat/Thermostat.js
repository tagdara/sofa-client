import React from 'react';
import TemperatureSensorLine from 'endpoint-model/controller/TemperatureSensor/TemperatureSensorLine'
//import ThermostatAvatar from 'devices/Thermostat/ThermostatAvatar'
//import TargetSetpointAvatar from 'endpoint-model/property/targetSetpoint/TargetSetpointAvatar'
import PowerLevelAutoAvatar from 'endpoint-model/combo/PowerLevelAutoAvatar'
import SetpointModeStack from 'endpoint-model/combo/SetpointModeStack'

// import { hasCapability } from 'endpoint-model/discovery'

import { Group } from '@mantine/core';

const Thermostat = props => {
    
    //  { hasCapability(props.endpointId, "ToggleController", "Night Mode") && <ToggleStateSegment endpointId={props.endpointId} instance={"Night Mode"} /> }

    return ( 
        <Group spacing="sm" noWrap style={{ width: "100%" }} position="apart" onClick={props.onClick}>
            <TemperatureSensorLine endpointId={props.endpointId} size={props.size}>
                {props.children}
            </TemperatureSensorLine>
            <Group noWrap spacing="xs">
                <PowerLevelAutoAvatar noPopover size="md" label={"Fan"} endpointId={props.endpointId} instance={"Power Level Auto"} />
                <SetpointModeStack size="md" endpointId={props.endpointId} />
            </Group>
        </Group>
    );

}

export default Thermostat
