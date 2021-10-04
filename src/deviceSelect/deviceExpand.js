import React from 'react';
import { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import DeviceExpandActions from './deviceExpandActions'
import DeviceExpandProperties from './deviceExpandProperties'
import DeviceExpandEvents from './deviceExpandEvents'

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import GridItem from 'components/GridItem';

import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';
import LightbulbOutlineIcon from '../LightbulbOutline';


export default function DeviceExpand(props) {

    const [isEventSource] = useState(false);
    const [open, setOpen] = useState(false);
    const eventSources={ 'DoorbellEventSource': [{"name": "DoorbellPress"}] }
    const icons = {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}

    useEffect(() => {
        getPropertyControllers(props.device)
    }, [props.device]);

    function getIcon(category, size='default') {
            
        var pxSize=24;
        var RealIcon=DeveloperBoardIcon
        if (size==='small') {
            pxSize=16
        }
        if (icons.hasOwnProperty(category)) {
            RealIcon=icons[category]
        }
        
        return <RealIcon size={pxSize} fontSize={size} />
    }


    function getActionControllers(device) {
        var caplist={}
        for (var cap in device.capabilities) {
            console.log(cap,device.capabilities[cap])
            var capi=device.capabilities[cap]['interface'].split(".")[1]
            if (getControllerActions(capi)) {
                caplist[capi]=getControllerActions(capi)
            }
        }
        return caplist
    }

    function getPropertyControllers(device) {
        var caplist={}

        for (var cap in device.capabilities) {
            if (device.capabilities[cap]['interface']==='Alexa') {
            } else {
                var capi=device.capabilities[cap]['interface'].split(".")[1]
                if (device.capabilities[cap].hasOwnProperty('properties') && device.capabilities[cap].properties.hasOwnProperty('supported') && device.capabilities[cap].properties.supported.length>0) {
                    caplist[capi]=device.capabilities[cap].properties.supported
                } 
            }
        }
        return caplist
    }
    
    function getEventSources(device) {
        var eslist={}
        for (var i = 0; i < device.capabilities.length; i++) {   
            if (device.capabilities[i]['interface']!=='Alexa') {
                var capi=device.capabilities[i]['interface'].split(".")[1]
                if (Object.keys(eventSources).includes(capi)) {
                    eslist[capi]=eventSources[capi]
                }
            }
        }
        return eslist
    }

    function getControllerActions(controller) {
        
        if (props.directives) {
            if (props.directives.hasOwnProperty(controller)) {
                return props.directives[controller]
            } 
        }
        return {}
    }
    
    return (
        (props.mode==='action' || (getEventSources(props.device) || (getPropertyControllers(props.device) && Object.keys(getPropertyControllers(props.device)).length>0))) &&
        <GridItem nopad={true}>
            <ListItem button onClick={() => setOpen(!open)}>
                <ListItemIcon>{getIcon(props.device.displayCategories)}</ListItemIcon>
                <ListItemText primary={props.device.friendlyName} secondary={props.device.displayCategories} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                    { (open && props.mode==='action') &&
                        <DeviceExpandActions device={props.device} controllers={getActionControllers(props.device)} select={props.select} />
                    }
                    { props.mode==='property' && 
                        <DeviceExpandProperties device={props.device} controllers={getPropertyControllers(props.device)} select={props.select} isEventSource={isEventSource} />
                    }
                    { (props.mode==='property' && getEventSources(props.device)) &&
                        <DeviceExpandEvents device={props.device} eventSources={getEventSources(props.device)} select={props.select} />
                    }
            </Collapse>
        </GridItem>
    )
}

