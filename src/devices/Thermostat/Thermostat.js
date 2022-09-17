import React from 'react';
import TemperatureSensorLine from 'endpoint-model/controller/temperatureSensor/TemperatureSensorLine'
import ThermostatAvatar from 'devices/Thermostat/ThermostatAvatar'
import PowerLevelAutoAvatar from 'endpoint-model/combo/PowerLevelAutoAvatar'
import ToggleStateSegment from 'endpoint-model/property/toggleState/ToggleStateSegment'
// import { hasCapability } from 'store/deviceHelpers'

import { Group } from '@mantine/core';

const Thermostat = props => {
    
    //  { hasCapability(props.endpointId, "ToggleController", "Night Mode") && <ToggleStateSegment endpointId={props.endpointId} instance={"Night Mode"} /> }

    return ( 
        <Group spacing="xl" noWrap style={{ width: "100%" }} position="apart">
            <TemperatureSensorLine endpointId={props.endpointId} onClick={props.onClick} size={props.size}>
                {props.children}
            </TemperatureSensorLine>
            <Group noWrap spacing="xs">
                <PowerLevelAutoAvatar size="md" label={"Fan"} endpointId={props.endpointId} instance={"Power Level Auto"} />
                <ThermostatAvatar size="md" endpointId={props.endpointId} />
                <ToggleStateSegment endpointId={props.endpointId} instance={"Fan.NightMode"} />
            </Group>
        </Group>
    );

}

export default Thermostat
