import React from 'react';
import TemperatureSensorLine from 'endpoint-model/controller/TemperatureSensor/TemperatureSensorLine'
import ThermostatAvatar from 'devices/Thermostat/ThermostatAvatar'
import PowerLevelAutoAvatar from 'endpoint-model/combo/PowerLevelAutoAvatar'

// import { hasCapability } from 'endpoint-model/discovery'

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
            </Group>
        </Group>
    );

}

export default Thermostat
