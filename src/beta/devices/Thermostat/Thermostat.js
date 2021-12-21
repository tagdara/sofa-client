import React from 'react';

//import FanPowerLevel from 'devices/Thermostat/FanPowerLevel'
//import ModeLines from 'controllers/ModeController/ModeLines'

import TemperatureSensorLine from 'beta/device-model/controller/temperatureSensor/TemperatureSensorLine'
import ThermostatAvatar from 'beta/devices/Thermostat/ThermostatAvatar'
import PowerLevelAvatar from 'beta/device-model/property/powerLevel/PowerLevelAvatar'

import { Group } from '@mantine/core';
import { useRegister } from 'store/useRegister'

const Thermostat = props => {
    
    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState) { return null }

    //function supportedRange() {
        //needs to be applied to the button version but stubbed for now
    //    try {
    //        return getController(props.device.endpointId, "ThermostatController").configuration.supportedRange
    //    }
    //    catch {}
    //    
    //    return [60,90]
    //}

    // <TargetSetpointAvatar size="md" onClick={() => setShowDetail(!showDetail)} endpointId={props.endpointId} />

    return ( 
        <Group spacing="xl" grow noWrap style={{ width: "100%" }} position="apart">
            <TemperatureSensorLine endpointId={props.endpointId} onClick={props.onClick} size={props.size}>
                {props.children}
            </TemperatureSensorLine>
            <Group noWrap spacing="xs">
                <PowerLevelAvatar size="md" label={"Fan"} endpointId={props.endpointId} />
                <ThermostatAvatar size="md" endpointId={props.endpointId} />
            </Group>
        </Group>
    );

//    return (
//        <Collapse in={showDetail}>
//            <Group noWrap position="apart">
//                <Text>{'Heat Set point'}</Text>
//                <ThermostatSetpointButtons endpointId={props.endpointId} />
//            </Group>
//            <FanPowerLevel endpointId={props.endpointId} />
//            <ModeLines directive = { directive } device={device} deviceState={deviceState}  />
//        </Collapse>
 //   )
}

export default Thermostat
