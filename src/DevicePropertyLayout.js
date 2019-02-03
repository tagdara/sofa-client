import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withDevices } from './DataContext/withDevices';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';

import GridBreak from './GridBreak';
import GridItem from './GridItem';

import DeviceExpand from './deviceSelect/deviceExpand';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    },
    searchGrid: {
        alignItems: "flex-end",
        padding: "16px 16px 0px 16px !important",
        height: 64,
        display: "flex",
    },

});

function DevicePropertyLayout(props) {

    const classes = useStyles();
    const [filter, setFilter] = useState('all');
    const [mode, setMode] = useState('property');
    const [searchTerm, setSearchTerm] = useState('');


    function toggleFilter(event) {
        if (filter=='open') {
            setFilter({ filter:'all'})
        } else {
            setFilter({ filter:'open'}) 
        }
    }
    
    function filterByType(devtype) {

        if (devtype=='all' || devtype=='') {
            return props.devices
        }
        return props.devicesByCategory(devtype, searchTerm)
    }
    
    function select(itemtype, deviceName, endpointId, controller, propertyName,z) { 
        console.log('z?',itemtype, z)
        if (mode=='action') {
            var item={  "type": itemtype,
                        "endpointId": endpointId,
                        "command": directive,
                        "controller": controller,
                        "deviceName": deviceName
            }
        } else {
            var item={  "type": itemtype,
                        "endpointId": endpointId,
                        "propertyName": propertyName,
                        "controller": controller,
                        "deviceName": deviceName
            }
        }

        props.setLayoutCard(props.returnName, {...props.returnProps, 'item':item, 'noBottom':'true'} )

    }
    
    return (    
        <React.Fragment>
            <GridItem wide={true} elevation={0}>
                <ListItem>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{endAdornment: (<InputAdornment position="end">
                            <IconButton><SearchIcon /></IconButton></InputAdornment>
                        ),}}
                    />
                </ListItem>
            </GridItem>
            <GridBreak label={"Devices"}>
            </GridBreak>
            { filterByType('ALL').map((device) =>
                <DeviceExpand key={ device.endpointId+'-exp' } device={device} mode={mode} controllers={props.controllers} select={select} directives={props.directives}  />
            )}
        </React.Fragment>
    )

};

export default withDevices(memo(DevicePropertyLayout));