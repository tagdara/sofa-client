import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withDevices } from './DataContext/withDevices';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import DeviceExpand from './deviceSelect/deviceExpand';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

function DeviceDirectiveLayout(props) {

    const classes = useStyles();
    const [filter, setFilter] = useState('all');
    const [mode, setMode] = useState('action');
    const [limit, setLimit] = useState(20);

    function toggleFilter(event) {
        if (filter=='open') {
            setFilter({ filter:'all'})
        } else {
            setFilter({ filter:'open'}) 
        }
    }
    
    function filterByType(devtype) {

        if (devtype=='all' || devtype=='') {
            if (limit<props.devices.length) {
                setTimeout(() => { setLimit(limit+20) }, 0)
            }
            
            console.log(props.devices.length, props.devices.slice(0, limit).length )
            return props.devices.slice(0, limit)
        }
        return props.devicesByCategory(devtype)
    }
    
    function select(deviceName, endpointId, controller, directive) { 
        
        var item={  "endpointId": endpointId,
                    "command": directive,
                    "controller": controller,
                    "deviceName": deviceName
        }

        props.setLayoutCard(props.returnName, {...props.returnProps, 'item':item } )


    }
    
    return (    
        <React.Fragment>
            <GridBreak label={"Devices"}>
            </GridBreak>
            { filterByType('all').map((device) =>
                <DeviceExpand key={ device.endpointId+'-exp' } device={device} mode={mode} controllers={props.controllers} select={select} directives={props.directives}  />
            )}
        </React.Fragment>
    )

};

export default withDevices(memo(DeviceDirectiveLayout));