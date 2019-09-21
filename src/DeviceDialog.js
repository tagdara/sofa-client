import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import GridSection from './GridSection';
import GridSearch from './GridSearch';

import Device from './deviceSelect/Device';
import CompositeDevice from './CompositeDevice';

import SofaDialog from "./dialogs/SofaDialog";
import Button from '@material-ui/core/Button';

export default function DeviceDialog(props) {

    const { devicesByCategory, controllers, directives } = useContext(DataContext);
    const [mode] = useState('all');
    const [limit, setLimit] = useState(50);
    const [nameFilter, setNameFilter] = useState('')
    const [showDevice, setShowDevice] = useState(null)
    
    useEffect(() => {
        function handleScroll() {
            //var lastDiv = document.querySelector("#scroll-content > div:last-child");
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            console.log('Fetch more devices', limit, limit+20);
            setLimit(limit+20)
        }   

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [limit]);

    function filterByType(devtype) {

        if (devtype==='all' || devtype==='') {
            var devs=devicesByCategory('ALL', nameFilter)
            return devs
            //return devs.slice(0, limit)
        }
        return devicesByCategory(devtype)
    }

    function executeDirective(iface, idir) {
        if (Object.keys(props.directives[iface][idir]).length===0) {
            props.device[iface].directive(idir)
        } else {
            console.log('directive requires parameters', props.directives[iface][idir])
        }
    }
    
    function closeDevice() {
        setShowDevice(null)
    }
 
    //function select(itemtype, deviceName, endpointId, controller, directive) { 
    //    if (mode==='action') {
    //        var item={  "type": itemtype,
    //                    "endpointId": endpointId,
    //                    "command": directive,
    //                    "controller": controller,
    //                    "deviceName": deviceName
    //        }
    //    }
    //    applyLayoutCard(returnPage.name, {...returnPage.props, 'item':item, 'noBottom':'true'} )
    //}
    
    return (
        <SofaDialog open={props.open} close={props.close} maxWidth={'lg'} >
            <GridSection name={"Devices"} secondary={<Button onClick={props.close}>Close</Button>} >
            <GridSearch wide={true} searchValue={nameFilter} setSearchValue={setNameFilter} />
                { filterByType('all').map((device) =>
                    <Device key={ device.endpointId } device={device} mode={mode} controllers={controllers} select={props.select ? props.select : executeDirective} directives={directives} showDevice={setShowDevice} />
                )}
                { showDevice && 
                    <CompositeDevice device={showDevice} close={closeDevice} directives={directives} />
                }
            </GridSection>
        </SofaDialog>
    )

};