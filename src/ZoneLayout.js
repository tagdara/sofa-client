import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { DeviceContext } from './DataContext/DeviceProvider';

import Zone from './devices/Zone';
import GridSection from './GridSection';

export default function ZoneLayout(props) {

    const { applyLayoutCard, applyBackPage } = useContext(LayoutContext);
    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    const { getChangeTimesForDevices } = useContext(DeviceContext)
    //const { deviceStatesByController } = useContext(DataContext)
    //const allzones = deviceStatesByController(['ContactSensor','MotionSensor'])
    const [allZones, setAllZones]=useState(undefined)
    const [changeTimes, setChangeTimes] = useState({})

    useEffect(() => {
        var contactSensors=getEndpointIdsByCategory('CONTACT_SENSOR','ZoneLayout')
        var motionSensors=getEndpointIdsByCategory('MOTION_SENSOR','ZoneLayout')
        setAllZones([...contactSensors, ...motionSensors])
        return function cleanup() {
            unregisterDevices('ZoneLayout');
        };
    // eslint-disable-next-line 
    }, [ ] )


    useEffect(() => {
        if (allZones) {
            getChangeTimesForDevices('detectionState',allZones).then(result => { setChangeTimes(result) } )
        }
    // eslint-disable-next-line 
    }, [allZones]);
    
    function getSecurityZones() {
        var secZones=[]
        for (var i = 0; i < allZones.length; i++) {
            if (!devices[allZones[i]].description.includes('(Automation)')) {
                secZones.push(allZones[i])
            } 
        }
        return secZones
    }
    
    function getAutomationZones() {
        var autoZones=[]
        for (var i = 0; i < allZones.length; i++) { 
            if (devices[allZones[i]].description.includes('(Automation)')) {
                autoZones.push(allZones[i])
            } 
        }
        return autoZones
    }

    function historyZone(name, endpointId) {
        applyBackPage('ZoneLayout', {} )
        applyLayoutCard('HistoryLayout', {"name": name, "endpointId": endpointId, "property":"detectionState"})
    }


    return (   
         cardReady('ZoneLayout') ? 
        <React.Fragment>
            <GridSection name={"Security Zones"} >
                { getSecurityZones().map(dev =>
                    <Zone history={historyZone} key={ dev } endpointId={ dev } name={ devices[dev].friendlyName } device={ devices[dev] } deviceState={deviceStates[dev]} changeTime={(changeTimes && (dev in changeTimes)) ? changeTimes[dev].time : "Unknown"}  />
                )}
            </GridSection>
            <GridSection name={"Automation Zones"} >
                { getAutomationZones().map(dev =>
                    <Zone history={historyZone} key={ dev } endpointId={ dev } name={ devices[dev].friendlyName } device={ devices[dev] } deviceState={deviceStates[dev]} changeTime={(changeTimes && (dev in changeTimes)) ? changeTimes[dev].time : "Unknown"}  />
                )}
            </GridSection>
        </React.Fragment>
        : null
    )
};
