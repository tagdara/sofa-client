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

    useEffect(() => {
  	    fetch('/data/security')
 		    .then(result=>result.json())
            .then(result=>{ setSecurityZones(result['Security']); setAutomationZones(result['Automation']); })
    }, []);

    function zoneReady() {
        
        if (!securityZones || Object.keys(props.deviceProperties).length==0) {
            return false
        } else {
            for (var dev in props.deviceProperties) {
                if (props.deviceProperties[dev].detectionState==undefined) {
                    return false
                }
            }
        }
        return true
    }
    
    function zoneCount(condition) {
        var count=0;
        for (var dev in props.deviceProperties) {
            if (condition=='all' || props.deviceProperties[dev].detectionState==condition) {
                if (securityZones && securityZones.includes(dev)) {
                    count=count+1
                }
            }
        }
        return count
    }


    function listOfOpenZones() {
        var openzones=''
        for (var dev in props.devices) {
            var device=props.devices[dev]
            if (props.deviceProperties[device.endpointId].hasOwnProperty('detectionState')) {
                if (props.deviceProperties[device.endpointId].detectionState=='open') {
                    if (securityZones.includes(device.friendlyName)) {
                        if (openzones) {
                            openzones=openzones+", "+device.friendlyName
                        } else {
                            openzones=device.friendlyName
                        }
                    }
                }
            }
        }
        return openzones
    }

    return (
            <GridItem wide={props.wide}>
                { zoneReady() ?
                <ListItem onClick={ (e) => props.applyLayoutCard('ZoneLayout', {'automationZones':automationZones, 'securityZones': securityZones})}>
                    <ToggleAvatar noback={!zoneOpen} avatarState={ (zoneOpen) ? "open" : "closed" } >
                        { zoneOpen ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                    </ToggleAvatar>
                    <ListItemText primary={zoneOpen ? zoneCount('open')+' zones are not secure' : 'All zones secure' } secondary={listOfOpenZones()}/>
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
