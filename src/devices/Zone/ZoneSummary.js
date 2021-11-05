import React, { useEffect } from 'react';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';
import useDeviceStore from 'store/deviceStore'
import useDeviceStateStore from 'store/deviceStateStore'

import { compareDevice, compareState, hasCapability, endpointIdsByDisplayCategory, register, unregister } from 'store/deviceHelpers'

const ZoneSummary = props => {
  
    const contactSensors = endpointIdsByDisplayCategory( "CONTACT_SENSOR")   
    const motionSensors = endpointIdsByDisplayCategory( "MOTION_SENSOR")     
    const allSensors = [...contactSensors, ...motionSensors] 
    const devices = useDeviceStore(state => Object.fromEntries(allSensors.filter(key => key in state.devices).map(key => [key, state.devices[key]])), (oldDevices, newDevices) => compareDevice(oldDevices, newDevices))
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
        if (hasCapability(endpointId, 'ContactSensor')) { 
            return states[endpointId].ContactSensor.detectionState.value === "DETECTED"
        }
        if (hasCapability(endpointId, 'MotionSensor')) { 
            return states[endpointId].MotionSensor.detectionState.value === "DETECTED"
        }
        return false
    }
    
    const openZoneList = openZones.map(endpointId => devices[endpointId].friendlyName)
    
    return (
            <SofaListItem   avatarBackground={ violated } avatarState={ violated ? "open" : "closed" } 
                            onClick={props.onClick}
                            avatar={ violated ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                            primary={ violated ? openZones.length+' zones are not secure' : 'All zones secure' } 
                            secondary={openZoneList.join(', ')}
            />
    );
}

export default ZoneSummary
