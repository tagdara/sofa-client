import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from 'DataContext/DataProvider';

import GridSection from 'components/GridSection';
import GridSearch from './GridSearch';

import Device from './deviceSelect/Device';
import CompositeDevice from './CompositeDevice';

export default function DeviceLayout(props) {

    const { devices, deviceStatesByCategory, deviceStates, controllers, directives } = useContext(DataContext);
    const [mode] = useState('all');
    const [limit, setLimit] = useState(50);
    const [nameFilter, setNameFilter] = useState('')
    const [showDevice, setShowDevice] = useState(null)
    
    useEffect(() => {
        function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            console.log('Fetch more devices', limit, limit+20);
            setLimit(limit+20)
        }   

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [limit]);

    function filterByType(devtype) {

        if (devtype==='all' || devtype==='') {
            var devs=deviceStatesByCategory('ALL', nameFilter)
            return devs
            //return devs.slice(0, limit)
        }
        return deviceStatesByCategory(devtype)
    }

    function executeDirective(iface, idir) {
        console.log('ED',iface,idir)
        if (!iface || !idir) {return false}
        if (Object.keys(directives[iface][idir]).length===0) {
            props.device[iface].directive(idir)
        } else {
            console.log('directive requires parameters', props.directives[iface][idir])
        }
    }
    
    function closeDevice() {
        setShowDevice(null)
    }
 
    return (    
        <GridSection name={"Devices"}>
        <GridSearch wide={true} searchValue={nameFilter} setSearchValue={setNameFilter} />
            { filterByType('all').map((device) =>
                <Device key={ device.endpointId } device={device} mode={mode} controllers={controllers} small={true}
                        select={executeDirective} directives={directives} showDevice={setShowDevice} />
            )}
            { showDevice && 
                <CompositeDevice endpointId={showDevice} deviceState={deviceStates[showDevice]} device={ devices[showDevice] } close={closeDevice} directives={directives} />
            }
        </GridSection>
    )

};