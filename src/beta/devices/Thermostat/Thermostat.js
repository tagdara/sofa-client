import React, { useState, useEffect } from 'react';

//import FanPowerLevel from 'devices/Thermostat/FanPowerLevel'
//import ModeLines from 'controllers/ModeController/ModeLines'

import TemperatureSensorLine from 'beta/device-model/controller/temperatureSensor/TemperatureSensorLine'
import ThermostatModeButtons from 'beta/device-model/property/thermostatMode/ThermostatModeButtons'
import TargetSetpointAvatar from 'beta/device-model/property/targetSetpoint/TargetSetpointAvatar'
//import ThermostatSetpointButtons from 'devices/Thermostat/ThermostatSetpointButtons'

import useDeviceStateStore from 'store/deviceStateStore'
//import useDeviceStore from 'store/deviceStore'
import { register, unregister } from 'store/deviceHelpers'
import { Group } from '@mantine/core';

const Thermostat = props => {
    
    const [showDetail, setShowDetail] = useState(false)

//    const thermostatDevice = useDeviceStore( state => state.devices[props.endpointId] )
    const thermostat = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Thermostat-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Thermostat-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!thermostat) { return null }

    //function supportedRange() {
        //needs to be applied to the button version but stubbed for now
    //    try {
    //        return getController(props.device.endpointId, "ThermostatController").configuration.supportedRange
    //    }
    //    catch {}
    //    
    //    return [60,90]
    //}

    return ( 
        <Group direction="column" spacing="xl" grow style={{ width: "100%" }}>
            <TemperatureSensorLine endpointId={props.endpointId} onClick={props.onClick} />
            <Group noWrap position="apart">
                <ThermostatModeButtons endpointId={props.endpointId} />
                { thermostat.ThermostatController.thermostatMode.value!=='OFF' &&
                    <TargetSetpointAvatar size="md" onClick={() => setShowDetail(!showDetail)} endpointId={props.endpointId} />
                }
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
//            <ModeLines directive = { directive } device={thermostatDevice} deviceState={thermostat}  />
//        </Collapse>
 //   )
}

export default Thermostat
