import React, { Component, createElement  } from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';

function ZoneList(props) {
    
    const zoneOpen = zoneCount('DETECTED')>0;
    const [filter, setFilter] = useState('open');
    const [securityZones, setSecurityZones] = useState([])
    const [automationZones, setAutomationZones] = useState([])

    function getSecurityZones() {
        var secZones=[]
        for (var i = 0; i < props.devices.length; i++) { 
            if (!props.devices[i].description.includes('(Automation)')) {
                secZones.push(props.devices[i])
            } 
        }
        return secZones
    }
    
    function getAutomationZones() {
        var autoZones=[]
        for (var i = 0; i < props.devices.length; i++) { 
            if (props.devices[i].description.includes('(Automation)')) {
                autoZones.push(props.devices[i])
            } 
        }
        return autoZones
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
            if (controller && (condition=='all' || controller.detectionState.value==condition.toUpperCase())) {
                count=count+1
            }
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
            if (controller &&  controller.detectionState.value=='DETECTED') {
                openzones=openzones+zone.friendlyName+" "
            }
        })
        return openzones
    }

    return (
            <GridItem wide={props.wide}>
                { zoneReady() ?
                <ListItem onClick={ (e) => props.applyLayoutCard('ZoneLayout', {'automationZones':automationZones, 'securityZones': securityZones})}>
                    <ToggleAvatar noback={!zoneOpen} avatarState={ (zoneOpen) ? "open" : "closed" } >
                        { zoneOpen ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                    </ToggleAvatar>
                    <ListItemText primary={zoneOpen ? zoneCount('DETECTED')+' zones are not secure' : 'All zones secure' } secondary={listOfOpenZones()}/>
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

export default withData(withLayout(ZoneList));
