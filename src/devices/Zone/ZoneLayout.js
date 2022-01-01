import React, { useState, useEffect } from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { endpointIdsByDisplayCategory, hasDescription, getChangeTimesForDevices } from 'store/deviceHelpers';
import { sortByName } from 'store/deviceHelpers'
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import SectionDivider from 'layout/SectionDivider'
import PageFrame from 'layout/PageFrame'
import SectionHeader from 'layout/SectionHeader'
import Zone from 'devices/Zone/Zone';
import HomeButton from 'layout/HomeButton';

const ZoneLayout = props => {

    const motionSensors = endpointIdsByDisplayCategory('MOTION_SENSOR')
    const contactSensors = endpointIdsByDisplayCategory('CONTACT_SENSOR')

    const allZones = sortByName([...motionSensors, ...contactSensors])
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
        <PageFrame>
            <SectionHeader title={"Zones"} />
            <SectionFrame>
                <SectionDivider label={"Security Zones"} />
                <SectionGrid>
                    { securityZones.map(endpointId =>
                        <Zone key={ endpointId } endpointId={endpointId} history={historyZone} changeTime={ getChangeTime(endpointId) } />
                    )}
                </SectionGrid>
                <SectionDivider label={"Automation Zones"} />
                <SectionGrid>
                    { automationZones.map(endpointId =>
                        <Zone key={ endpointId } endpointId={endpointId} history={historyZone} changeTime={ getChangeTime(endpointId) } />
                    )}
                </SectionGrid>
            </SectionFrame>
            <SectionHeader>
                <HomeButton />
            </SectionHeader>
        </PageFrame>
    )
};

export default ZoneLayout;
