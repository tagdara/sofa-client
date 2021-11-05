import React, { useState, useEffect } from 'react';
import { selectPage } from 'store/layoutHelpers'
import { endpointIdsByDisplayCategory, hasDescription, getChangeTimesForDevices } from 'store/deviceHelpers';

import Zone from 'devices/Zone/Zone';
import GridSection from 'components/GridSection';

const ZoneLayout = props => {

    const motionSensors = endpointIdsByDisplayCategory('MOTION_SENSOR')
    const contactSensors = endpointIdsByDisplayCategory('CONTACT_SENSOR')

    const allZones = [...motionSensors, ...contactSensors]
    const automationZones = allZones.filter( endpointId => hasDescription(endpointId, '(Automation)'))
    const securityZones = allZones.filter( endpointId => !hasDescription(endpointId, '(Automation)'))
    const [ changeTimes, setChangeTimes ] = useState({})

    useEffect(() => {
        if (allZones) {
            getChangeTimesForDevices('detectionState',allZones).then(result => { setChangeTimes(result) } )
        }
    // eslint-disable-next-line 
    }, []);

    function historyZone(name, endpointId) {
        selectPage('HistoryLayout', {"name": name, "endpointId": endpointId, "property":"detectionState"})
    }

    function getChangeTime(endpointId) {
        return (changeTimes && (endpointId in changeTimes)) ? changeTimes[endpointId].time : "Unknown"
    }

    return (   
        <>
            <GridSection name={"Security Zones"} >
                { securityZones.map(dev =>
                    <Zone endpointId={dev} history={historyZone} key={ dev } changeTime={ getChangeTime(dev) } />
                )}
            </GridSection>
            <GridSection name={"Automation Zones"} >
                { automationZones.map(dev =>
                    <Zone endpointId={dev} history={historyZone} key={ dev } changeTime={ getChangeTime(dev) } />
                )}
            </GridSection>
        </>
    )
};

export default ZoneLayout;
