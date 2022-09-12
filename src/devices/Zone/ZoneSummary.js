import React, { useEffect } from 'react';
import PlaceholderCard from 'layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'
import WideAvatar from 'components/WideAvatar'
import { ShieldSlash  } from "react-bootstrap-icons"

import { compareState, hasCapability, endpointIdsByDisplayCategory, devicesByEndpointIds, register, unregister } from 'store/deviceHelpers'
import { Badge, Group, Stack, Text } from '@mantine/core'
import { Shield } from 'react-feather';
import { selectPage } from 'helpers/layoutHelpers';

const ZoneSummary = props => {
  
    const contactSensors = endpointIdsByDisplayCategory( "CONTACT_SENSOR")   
    const motionSensors = endpointIdsByDisplayCategory( "MOTION_SENSOR")     
    const allSensors = [...contactSensors, ...motionSensors] 
    const devices = devicesByEndpointIds(allSensors)
    const states = useDeviceStateStore(state => Object.fromEntries(allSensors.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))

    useEffect(() => {
        register(allSensors, "ZoneHero")
        return function cleanup() {
            unregister(allSensors, "ZoneHero")
        };
    // eslint-disable-next-line 
    }, [])

    if (!states || Object.keys(states).length < 1) { return <PlaceholderCard /> }

    const automationZones = Object.keys(devices).filter( endpointId => devices[endpointId].description.includes('(Automation)'))
    const securityZones = Object.keys(devices).filter( endpointId => !automationZones.includes(endpointId))
    const openZones = securityZones.filter(endpointId => isOpen(endpointId))
    const violated = openZones.length > 0

    function isOpen(endpointId) {
        try {
            if (hasCapability(endpointId, 'ContactSensor') && states[endpointId]) { 
                return states[endpointId].ContactSensor.detectionState.value === "DETECTED"
            }
            if (hasCapability(endpointId, 'MotionSensor') && states[endpointId]) { 
                return states[endpointId].MotionSensor.detectionState.value === "DETECTED"
            }
        } 
        catch {}
        return false
    }
    
    const openZoneList = openZones.map(endpointId => devices[endpointId].friendlyName)
    
    return (
        <Stack onClick={ () => selectPage('ZonePage') }> 
            <Group noWrap style={{ alignItems: violated ? "flex-start" : "center "}}>
                <WideAvatar color={violated ? "red" : "green"} 
                            size="lg"
                            onClick={ () => selectPage('LightPage') }
                            left={ violated ? < ShieldSlash size={20} /> : <Shield size={20} />} 
                            right={ violated ? openZones.length : undefined }
                />
                <Stack spacing={"xs"} >
                    <Text   size={ violated ? "sm" : "lg" }
                            weight={500} 
                            style={{width: "100%"}} 
                            lineClamp={1}
                    >
                        { violated ? "Zones not secure" : "All zones secure" }
                    </Text>
                    { (openZoneList && openZoneList.length>0) &&
                        <Group spacing="xs">
                            { openZoneList.map( zone => <Badge size="sm" key={zone+"badge"} color="red" variant="light">{zone}</Badge> )}
                        </Group>
                    }
                </Stack>
            </Group>
        </Stack>
    );
}

export default ZoneSummary
