import React, { useState, useContext } from 'react';
import { DataContext } from '../DataContext/DataProvider';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';

import SofaCategoryFilter from './sofaCategoryFilter'
import DeviceExpand from './deviceExpand'

const useStyles = makeStyles({        
    list: {
        minWidth: 320,
        width: "100%",
    },
 
});

export default function DeviceSelect(props) {

    const [filter, setFilter] = useState('');
    const { controllers, directives } = useContext(DataContext);
    const classes = useStyles();

    function filterDevices(mode, filter, devices) {

        if (mode==='action') {
            return actionDevices(filter, devices)
        } else if (mode==='property') {
            return propertyDevices(filter, devices)
        }
    }
    
    function actionDevices(filter, devices) {
        var actiondevices=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].displayCategories===filter || filter==='') {
                var dc=getControllers(devices[i])
                for (var j = 0; j < dc.length; j++) {
                    var cc=getControllerCommands(dc[j])
                    if (Object.keys(cc).length>0) {
                        actiondevices.push(devices[i])
                        break
                    }
                }
            }
        }
        return actiondevices
    }

    function propertyDevices(filter, devices) {
        var propertydevices=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].displayCategories===filter || filter==='') {
                if (getProperties(devices[i]).length>0) {
                    propertydevices.push(devices[i])
                }
            }
        }
        return propertydevices
    }
    
    
    function getProperties(device, controller) {
        var proplist=[]
        for (var i = 0; i < device.capabilities.length; i++) {
            if (device.capabilities[i].properties.hasOwnProperty('supported')) {
                for (var j = 0; j < device.capabilities[i].properties.supported.length; j++) {
                    if (device.capabilities[i].interface.split(".")[1]===controller || controller===null) {
                        proplist.push(device.capabilities[i].properties.supported[j].name)
                    }
                }
            }
        }
        return proplist
    }


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
    
    function getControllerCommands(controller) {
        return directives[controller]
    }
    
    function applyFilter(newfilter) {
        setFilter(newfilter)
    }

    return (
        <List className={classes.list} >
            <SofaCategoryFilter applyFilter={applyFilter} />
            { filterDevices(props.mode, filter, props.devices).map((device) => (
                <DeviceExpand key={ device.endpointId+'-exp' } device={device} mode={props.mode} controllers={controllers} select={props.select} directives={directives}  />
            ))}
        </List>
    )
}
