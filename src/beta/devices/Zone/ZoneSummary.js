import React, { useEffect } from 'react';
import PlaceholderCard from 'layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'
import green from '@mui/material/colors/green';
import red from '@mui/material/colors/red';

import { compareState, hasCapability, endpointIdsByDisplayCategory, devicesByEndpointIds, register, unregister } from 'store/deviceHelpers'
import { Avatar, Badge, Group, Text } from '@mantine/core'
import { Shield, AlertOctagon } from 'react-feather'

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
    const iconColor = violated ? red[500] : green[500]


    function isOpen(endpointId) {
        if (hasCapability(endpointId, 'ContactSensor') && states[endpointId]) { 
            return states[endpointId].ContactSensor.detectionState.value === "DETECTED"
        }
        if (hasCapability(endpointId, 'MotionSensor') && states[endpointId]) { 
            return states[endpointId].MotionSensor.detectionState.value === "DETECTED"
        }
        return false
    }
    
    const openZoneList = openZones.map(endpointId => devices[endpointId].friendlyName)
    
    //avatarBackground={ violated } avatarState={ violated ? "open" : "closed" } 

    return (
        <Group direction="column" noWrap>
            <Group noWrap>
                <Avatar color={violated ? "red" : "green"}>
                    { violated ? < AlertOctagon size={20} /> : <Shield size={20} />}
                </Avatar>     
                <Text size="lg" weight={700} style={{width: "100%"}} lineClamp={1}>{ violated ? openZones.length+' zone' +  ( openZones.length == 1 ? " is ": "s are ") + "not secure" : 'All zones secure' }</Text>
            </Group>
            { (openZoneList && openZoneList.length>0) &&
            <Group>
                { openZoneList.map( zone => <Badge color="red" variant="light">{zone}</Badge> )}
            </Group>
            }
        </Group>
    );
}

export default ZoneSummary
