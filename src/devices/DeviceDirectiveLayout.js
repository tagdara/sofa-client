import React, { useState, useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceStateContext } from 'context/DeviceStateContext';

import GridBreak from './GridBreak';
import DeviceExpand from './deviceSelect/deviceExpand';

export default function DeviceDirectiveLayout(props) {

    const { applyLayoutCard, returnPage } = useContext(LayoutContext);
    const { devices, devicesByCategory, controllers, directives } = useContext(DeviceStateContext);
    const [mode] = useState('action');
    const [limit, setLimit] = useState(20);

    function filterByType(devtype) {

        if (devtype==='all' || devtype==='') {
            if (limit<devices.length) {
                setTimeout(() => { setLimit(limit+20) }, 0)
            }
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
                <DeviceExpand key={ device.endpointId+'-exp' } device={device} mode={mode} controllers={controllers} select={select} directives={directives}  />
            )}
        </React.Fragment>
    )

};
