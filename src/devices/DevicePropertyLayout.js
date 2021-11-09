import React, { useState, useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceStateContext } from 'context/DeviceStateContext';

import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';

import GridBreak from './GridBreak';
import GridItem from 'components/GridItem';

import DeviceExpand from './deviceSelect/deviceExpand';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

export default function DevicePropertyLayout(props) {

    const { applyLayoutCard, returnPage } = useContext(LayoutContext);
    const { devices, devicesByCategory, controllers, directives } = useContext(DeviceStateContext);
    const [mode] = useState('property');
    const [searchTerm, setSearchTerm] = useState('');

    function filterByType(devtype) {

        if (devtype==='all' || devtype==='') {
            return devices
        }
        return devicesByCategory(devtype, searchTerm)
    }
    
    function select(itemtype, deviceName, endpointId, controller, propertyName) { 

        var item={}
        if (mode==='action') {
            item={  "type": itemtype,
                        "endpointId": endpointId,
                        "command": propertyName,
                        "controller": controller,
                        "deviceName": deviceName
            }
        } else {
            item={  "type": itemtype,
                        "endpointId": endpointId,
                        "propertyName": propertyName,
                        "controller": controller,
                        "deviceName": deviceName
            }
        }

        applyLayoutCard(returnPage.name, {...returnPage.props, 'item':item, 'noBottom':'true'} )

    }
    
    return (    
        <React.Fragment>
            <GridItem wide={true} elevation={0}>
                <ListItem>
                    <TextField fullWidth variant="outlined" label="Search" value={searchTerm}
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
                <DeviceExpand key={ device.endpointId+'-exp' } device={device} mode={mode} controllers={controllers} select={select} directives={directives}  />
            )}
        </React.Fragment>
    )

};