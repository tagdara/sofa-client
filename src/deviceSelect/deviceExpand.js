import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';

import DeviceItem from './deviceItem'
import DeviceExpandActions from './deviceExpandActions'
import DeviceExpandProperties from './deviceExpandProperties'
import GridItem from '../GridItem';

const useStyles = makeStyles({
        
    deviceExpand: {
        padding: "0",
        marginBottom: 2,
    },
    detailList: {
        paddingLeft: 24,
    },
    expListItem: {
        padding: 0,
        width: '100%',
    },
    list: {
        minWidth: 320,
        width: "100%",
    },
    summary: {
        margin: '0 !important',
        padding: 0,
    },
    sumexp: {
        margin: '0 !important',
        padding: 0,
    },
});

export default function DeviceExpand(props) {

    const classes = useStyles();
    const [propertyControllers, setPropertyControllers] = useState({});
    const [isPropertyController, setIsPropertyController] = useState(false);
    
    useEffect(() => {
        getPropertyControllers(props.device)
    }, []);

    function getControllers(device) {
        var caplist=[]
        for (var cap in device.capabilities) {
            var capi=device.capabilities[cap]['interface'].split(".")[1]
            if (getControllerCommands(capi)) {
                caplist.push(device.capabilities[cap]['interface'].split(".")[1])
            }
        }
        return caplist
    }

    function getActionControllers(device) {
        var caplist={}
        for (var cap in device.capabilities) {
            var capi=device.capabilities[cap]['interface'].split(".")[1]
            if (getControllerActions(capi)) {
                caplist[capi]=getControllerActions(capi)
            }
        }
        return caplist
    }

    function getPropertyControllers(device) {
        var caplist={}
        var hasprops=false
        for (var cap in device.capabilities) {
            if (device.capabilities[cap]['interface']=='Alexa') {
            } else {
                var capi=device.capabilities[cap]['interface'].split(".")[1]
                if (device.capabilities[cap].properties.hasOwnProperty('supported') && device.capabilities[cap].properties.supported.length>0) {
                    caplist[capi]=device.capabilities[cap].properties.supported
                    hasprops=true
                }
            }
        }
        return caplist
    }

    function getControllerActions(controller) {
        
        var cmds=[]
        if (props.directives) {
            if (props.directives.hasOwnProperty(controller)) {
                return props.directives[controller]
            } 
        }
        return {}
    }
    
    return (
        (props.mode=='action' || (getPropertyControllers(props.device) && Object.keys(getPropertyControllers(props.device)).length>0)) &&
        <GridItem nopad={true}>
            <ExpansionPanel elevation={0} CollapseProps={{ unmountOnExit: true }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ content: classes.summary, root: classes.summary, }}>
                    <DeviceItem categories={props.device.displayCategories} name={props.device.friendlyName} />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.deviceExpand}>
                    { props.mode=='action' ?
                        <DeviceExpandActions device={props.device} controllers={getActionControllers(props.device)} select={props.select} />
                    :
                        <DeviceExpandProperties device={props.device} controllers={getPropertyControllers(props.device)} select={props.select} />
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </GridItem>
    )
}

