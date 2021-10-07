import React, { useEffect, useContext } from 'react';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import { DeviceContext } from 'context/DeviceContext';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';

const ZoneSummary = React.memo(props => {

    const { hasCapability } = useContext(DeviceContext);    

    useEffect(() => {
        props.addEndpointIds("category", "CONTACT_SENSOR", "ZoneHero")
        props.addEndpointIds("category", "MOTION_SENSOR", "ZoneHero")
        return function cleanup() {
            props.unregisterDevices("ZoneHero");
        };
    // eslint-disable-next-line 
    }, [])

    if (!props.deviceState || Object.keys(props.deviceState).length < 1) { return <PlaceholderCard /> }

    const automationZones = Object.keys(props.devices).filter( endpointId => props.devices[endpointId].description.includes('(Automation)'))
    const securityZones = Object.keys(props.devices).filter( endpointId => !automationZones.includes(endpointId))
    const openZones = securityZones.filter(endpointId => isOpen(endpointId))
    const violated = openZones.length > 0

    function isOpen(endpointId) {
        if (hasCapability(endpointId, 'ContactSensor')) { 
            return props.deviceState[endpointId].ContactSensor.detectionState.value === "DETECTED"
        }
        if (hasCapability(endpointId, 'MotionSensor')) { 
            return props.props.deviceState[endpointId].MotionSensor.detectionState.value === "DETECTED"
        }
        return false
    }
    
    const openZoneList = openZones.map(endpointId => props.devices[endpointId].friendlyName)
    
    return (
            <SofaListItem   avatarBackground={ violated } avatarState={ violated ? "open" : "closed" } 
                            onClick={props.onClick}
                            avatar={ violated ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                            primary={ violated ? openZones.length+' zones are not secure' : 'All zones secure' } 
                            secondary={openZoneList.join(', ')}
            />
    );
}, deviceStatesAreEqual);

export default dataFilter(ZoneSummary)
