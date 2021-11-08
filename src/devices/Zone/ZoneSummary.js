import React, { useEffect } from 'react';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import CardLine from 'components/CardLine';
import CardLineText from 'components/CardLineText';
import ColorAvatar from 'components/ColorAvatar';

import PlaceholderCard from 'layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { compareState, hasCapability, endpointIdsByDisplayCategory, devicesByEndpointIds, register, unregister } from 'store/deviceHelpers'

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
            <CardLine  onClick={props.onClick}>
                <ColorAvatar color={iconColor}>
                    { violated ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                </ColorAvatar>      
                <CardLineText primary={ violated ? openZones.length+' zones are not secure' : 'All zones secure' } secondary={openZoneList.join(', ')} />
            </CardLine>
    );
}

export default ZoneSummary
