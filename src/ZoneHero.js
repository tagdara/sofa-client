import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import SofaListItem from './SofaListItem';
import GridItem from './GridItem';
import PlaceholderCard from './PlaceholderCard';

export default function ZoneHero(props) {

    const { applyLayoutCard } = useContext(LayoutContext);
    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    const [zones, setZones]=useState([])
    
    useEffect(() => {
        setZones(getEndpointIdsByCategory(['CONTACT_SENSOR','MOTION_SENSOR'],'ZoneHero'))
        return function cleanup() {
            unregisterDevices('ZoneHero');
        };
    // eslint-disable-next-line 
    }, [ ] )

   
    function getSecurityZones() {
        var secZones=[]
        for (var i = 0; i < zones.length; i++) { 
            if (!devices[zones[i]].description.includes('(Automation)')) {
                secZones.push(zones[i])
            } 
        }
        return secZones
    }
    
    function zoneCount(condition) {
        var count=0;
        getSecurityZones().map(zone => {
            var controller=null
            if (deviceStates[zone] && deviceStates[zone].hasOwnProperty('ContactSensor')) {
                controller=deviceStates[zone].ContactSensor
            } else if (deviceStates[zone] && deviceStates[zone].hasOwnProperty('MotionSensor')) {
                controller=deviceStates[zone].MotionSensor
            } 
            
            //console.log('cont',controller.detectionState.value)
            if (controller && (condition==='all' || controller.detectionState.value===condition.toUpperCase())) {
                count=count+1
            }
            return ''
        })
        return count
    }


    function listOfOpenZones() {
        var openzones=''
        getSecurityZones().map(zone => {
            var controller=null
            if (deviceStates[zone] && deviceStates[zone].hasOwnProperty('ContactSensor')) {
                controller=deviceStates[zone].ContactSensor
            } else if (deviceStates[zone] && deviceStates[zone].hasOwnProperty('MotionSensor')) {
                controller=deviceStates[zone].MotionSensor
            }
            if (controller &&  controller.detectionState.value==='DETECTED') {
                openzones=openzones+devices[zone].friendlyName+" "
            }
            return ''
        })
        return openzones
    }
    
    if (!cardReady('ZoneHero')) {
        return <PlaceholderCard count={1} />
    }
    
    return (
        <GridItem wide={props.wide} nopad={true}>
            <SofaListItem   avatarBackground={ zoneCount('DETECTED')>0 } avatarState={ (zoneCount('DETECTED')>0) ? "open" : "closed" } 
                            onClick={ (e) => applyLayoutCard('ZoneLayout')} 
                            avatar={ zoneCount('DETECTED')>0 ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                            primary={ (zoneCount('DETECTED')>0) ? zoneCount('DETECTED')+' zones are not secure' : 'All zones secure' } 
                            secondary={listOfOpenZones()}
            />
        </GridItem>
    );
}

