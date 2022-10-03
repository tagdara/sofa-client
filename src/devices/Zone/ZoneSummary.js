import React from 'react';
import PlaceholderCard from 'layout/PlaceholderCard';
import WideAvatar from 'layout/components/WideAvatar'
import { Badge, Group, Stack, Text } from '@mantine/core'
import { selectPage } from 'helpers/layoutHelpers';
import { useMultiRegister } from 'endpoint-model/register'

import { endpointIdsByDisplayCategory, devicesByEndpointIds } from 'endpoint-model/discovery'

import { IconShield, IconShieldOff } from '@tabler/icons';

const ZoneSummary = props => {
  
    const contactSensors = endpointIdsByDisplayCategory( "CONTACT_SENSOR")   
    const motionSensors = endpointIdsByDisplayCategory( "MOTION_SENSOR")     
    
    const allSensors = [...contactSensors, ...motionSensors] 
    const devices = devicesByEndpointIds(allSensors)
    const { deviceStates } = useMultiRegister(allSensors)

    if (!deviceStates || Object.keys(deviceStates).length < 1) { return <PlaceholderCard /> }

    const automationZones = Object.keys(devices).filter( endpointId => devices[endpointId].description.includes('(Automation)'))
    const securityZones = Object.keys(devices).filter( endpointId => !automationZones.includes(endpointId))
    const openZones = securityZones.filter(endpointId => isOpen(endpointId))
    const violated = openZones.length > 0

    function isOpen(endpointId) {
        try {
            if ( deviceStates[endpointId]?.['Alexa.ContactSensor']?.detectionState.value === "DETECTED") {
                return true
            }
            if (deviceStates[endpointId]?.['Alexa.MotionSensor']?.detectionState.value === "DETECTED") {
                return true
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
                            left={ violated ? < IconShieldOff size={20} /> : <IconShield size={20} />} 
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
