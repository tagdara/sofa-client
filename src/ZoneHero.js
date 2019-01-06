import React, { Component, createElement  } from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import GridItem from './GridItem';
import ToggleAvatar from './ToggleAvatar';

const useStyles = makeStyles({
        
    xlistItem: {
        padding: 0,
        width: '100%',
        minHeight: 48,
    },
});


function ZoneList(props) {
    
    const classes = useStyles();
    const zoneOpen = zoneCount('open')>0;
    const [filter, setFilter] = useState('open');
    

    function zoneReady() {
        
        if (Object.keys(props.deviceProperties).length==0) {
            return false
        } else {
            for (var dev in props.deviceProperties) {
                if (props.deviceProperties[dev].position==undefined) {
                    return false
                }
            }
        }
        return true
    }
    
    function zoneCount(condition) {
        var count=0;
        for (var dev in props.deviceProperties) {
            if (condition=='all' || props.deviceProperties[dev].position==condition) {
                if (props.deviceProperties[dev].type=='Alarm') {
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
            if (props.deviceProperties[device.friendlyName].hasOwnProperty('position')) {
                if (props.deviceProperties[device.friendlyName].position=='open') {
                    if (props.deviceProperties[device.friendlyName].type=='Alarm') {
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
                <ListItem className={classes.listItem} onClick={ (e) => props.setLayoutCard('ZoneLayout')}>
                    <ToggleAvatar avatarState={ (zoneOpen) ? "open" : "closed" } >
                        { zoneOpen ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                    </ToggleAvatar>
                    <ListItemText primary={zoneOpen ? zoneCount('open')+' zones are not secure' : 'All zones secure' } secondary={listOfOpenZones()}/>
                </ListItem>
                :
                <ListItem className={classes.listItem}>
                    <ToggleAvatar avatarState={"notready"} ><PriorityHighIcon/></ToggleAvatar>
                    <ListItemText primary={'Waiting for zone data'}/>
                </ListItem>
                }
            </GridItem>
    );
}

export default withData(ZoneList);
