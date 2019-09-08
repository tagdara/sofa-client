import React, { useState, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import GridBreak from './GridBreak';
import Device from './deviceSelect/Device';

export default function DeviceLayout(props) {

    const { applyLayoutCard } = useContext(LayoutContext);
    const { devices, devicesByCategory, returnPage, controllers, directives } = useContext(DataContext);
    const [mode] = useState('action');
    const [limit, setLimit] = useState(20);

    function filterByType(devtype) {

        if (devtype==='all' || devtype==='') {
            if (limit<devices.length) {
                setTimeout(() => { setLimit(limit+20) }, 0)
            }
            
            console.log(devices.length, devices.slice(0, limit).length )
            return devices.slice(0, limit)
        }
        return devicesByCategory(devtype)
    }
 
    function select(itemtype, deviceName, endpointId, controller, directive) { 

        if (mode==='action') {
            var item={  "type": itemtype,
                        "endpointId": endpointId,
                        "command": directive,
                        "controller": controller,
                        "deviceName": deviceName
            }
        }
        applyLayoutCard(returnPage.name, {...returnPage.props, 'item':item, 'noBottom':'true'} )

    }
    
    return (    
        <React.Fragment>
            <GridBreak label={"Devices"}>
            </GridBreak>
            { filterByType('all').map((device) =>
                <Device key={ device.endpointId+'-exp' } device={device} mode={mode} controllers={controllers} select={select} directives={directives}  />
            )}
        </React.Fragment>
    )

};