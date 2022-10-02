import React, { useState, useEffect } from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { endpointIdsByDisplayCategory, descriptionIncludes } from 'endpoint-model/discovery'
import { getChangeTimesForDevices } from 'history/historyUtils'
import { sortByName } from 'endpoint-model/discovery'
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import SectionDivider from 'layout/section/SectionDivider'
import PageFrame from 'layout/PageFrame'
import SectionHeader from 'layout/section/SectionHeader'
import Zone from 'devices/Zone/Zone';


const ZoneLayout = props => {

    const motionSensors = endpointIdsByDisplayCategory('MOTION_SENSOR')
    const contactSensors = endpointIdsByDisplayCategory('CONTACT_SENSOR')

    const allZones = sortByName([...motionSensors, ...contactSensors])
    const automationZones = allZones.filter( endpointId => descriptionIncludes(endpointId, '(Automation)'))
    const securityZones = allZones.filter( endpointId => !descriptionIncludes(endpointId, '(Automation)'))
    const [ changeTimes, setChangeTimes ] = useState([])


    useEffect(() => {
        if (allZones) {
            getChangeTimesForDevices('detectionState',allZones)
                .then(result => { setChangeTimes(result.event.payload) } )
        }
    // eslint-disable-next-line 
    }, []);

    function historyZone(name, endpointId) {
        selectPage('HistoryLayout', {"name": name, "endpointId": endpointId, "property":"detectionState"})
    }

    function getChangeTime(endpointId) {
        if (changeTimes && changeTimes.length) {
            const results = changeTimes.filter(item => item.endpointId === endpointId)
            console.log('cgt', endpointId, results)
            return results[0].timestamp
            // return (changeTimes && (endpointId in changeTimes)) ? changeTimes[endpointId].time : "Unknown"
        }
        return "Unknown"
    }

    return (    
        <PageFrame>
            <SectionHeader title={"Zones"} />
            <SectionFrame padScroll={200}>
                <SectionDivider first label={"Security Zones"} />
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
        </PageFrame>
    )
};

export default ZoneLayout;
