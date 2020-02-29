import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { DeviceContext } from './DataContext/DeviceProvider';

import Zone from './devices/Zone';
import GridSection from './GridSection';

export default function ZoneLayout(props) {

    const { applyLayoutCard, applyBackPage } = useContext(LayoutContext);
    const { getChangeTimesForDevices } = useContext(DeviceContext)
    const { deviceStatesByController } = useContext(DataContext)
    const allzones = deviceStatesByController(['ContactSensor','MotionSensor'])
    const [changeTimes, setChangeTimes] = useState({})

    useEffect(() => {
        getChangeTimesForDevices('detectionState',allzones).then(result => setChangeTimes(result))
    }, []);
    
    function getSecurityZones() {
        var secZones=[]
        for (var i = 0; i < allzones.length; i++) {
            if (!allzones[i].description.includes('(Automation)')) {
                secZones.push(allzones[i])
            } 
        }
        return secZones
    }
    
    function getAutomationZones() {
        var autoZones=[]
        for (var i = 0; i < allzones.length; i++) { 
            if (allzones[i].description.includes('(Automation)')) {
                autoZones.push(allzones[i])
            } 
        }
        return autoZones
    }

    function historyZone(name, endpointId) {
        applyBackPage('ZoneLayout', {} )
        applyLayoutCard('HistoryLayout', {"name": name, "endpointId": endpointId, "property":"detectionState"})
    }

    return (    
        <React.Fragment>
            <GridSection name={"Security Zones"} >
                { getSecurityZones().map(device =>
                    <Zone history={historyZone} key={ device.endpointId } endpointId={ device.endpointId } name={ device.friendlyName } device={ device } changeTime={(changeTimes && (device.endpointId in changeTimes)) ? changeTimes[device.endpointId].time : "Unknown"}  />
                )}
            </GridSection>
            <GridSection name={"Automation Zones"} >
                { getAutomationZones().map(device =>
                    <Zone history={historyZone} key={ device.endpointId } endpointId={ device.endpointId } name={ device.friendlyName } device={ device } changeTime={(changeTimes && (device.endpointId in changeTimes)) ? changeTimes[device.endpointId].time : "Unknown"}  />
                )}
            </GridSection>
        </React.Fragment>
    )
};
