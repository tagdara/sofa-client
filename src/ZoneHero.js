import React from 'react';
import { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';

export default function ZoneHero(props) {

    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStatesByCategory } = useContext(DataContext);
    const devices=deviceStatesByCategory(['CONTACT_SENSOR','MOTION_SENSOR'])
    const zoneOpen = zoneCount('DETECTED')>0;
   
    function getSecurityZones() {
        var secZones=[]
        for (var i = 0; i < devices.length; i++) { 
            if (!devices[i].description.includes('(Automation)')) {
                secZones.push(devices[i])
            } 
        }
        return secZones
    }

    function zoneReady() {
        
        if (!getSecurityZones()) {
            return false
        } 
        return true
    }
    
    function zoneCount(condition) {
        var count=0;
        getSecurityZones().map(zone => {
            var controller=null
            if (zone.hasOwnProperty('ContactSensor')) {
                controller=zone.ContactSensor
            } else if (zone.hasOwnProperty('MotionSensor')) {
                controller=zone.MotionSensor
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
            if (zone.hasOwnProperty('ContactSensor')) {
                controller=zone.ContactSensor
            } else if (zone.hasOwnProperty('MotionSensor')) {
                controller=zone.MotionSensor
            }
            if (controller &&  controller.detectionState.value==='DETECTED') {
                openzones=openzones+zone.friendlyName+" "
            }
            return ''
        })
        return openzones
    }

    return (
        <GridItem wide={props.wide}>
            { zoneReady() ?
            <ListItem>
                <ToggleAvatar noback={!zoneOpen} avatarState={ (zoneOpen) ? "open" : "closed" } onClick={ (e) => applyLayoutCard('ZoneLayout')} >
                    { zoneOpen ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                </ToggleAvatar>
                <ListItemText onClick={ (e) => applyLayoutCard('ZoneLayout')} primary={zoneOpen ? zoneCount('DETECTED')+' zones are not secure' : 'All zones secure' } secondary={listOfOpenZones()}/>
            </ListItem>
            :
            <ListItem>
                <ToggleAvatar avatarState={"notready"} ><PriorityHighIcon/></ToggleAvatar>
                <ListItemText primary={'Waiting for zone data'}/>
            </ListItem>
            }
        </GridItem>
    );
}

