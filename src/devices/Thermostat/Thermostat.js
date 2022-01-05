import React from 'react';
import TemperatureSensorLine from 'device-model/controller/temperatureSensor/TemperatureSensorLine'
import ThermostatAvatar from 'devices/Thermostat/ThermostatAvatar'
import PowerLevelAutoAvatar from 'device-model/combo/PowerLevelAutoAvatar'

import { Group } from '@mantine/core';

const Thermostat = props => {
    
    return ( 
        <Group spacing="xl" grow noWrap style={{ width: "100%" }} position="apart">
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
