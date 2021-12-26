import React, { useState, useEffect } from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { endpointIdsByDisplayCategory, hasDescription, getChangeTimesForDevices } from 'store/deviceHelpers';
import { sortByName } from 'store/deviceHelpers'
import { Group } from '@mantine/core';
import { PageFrame } from 'device-model/instance/PageFrame'
import SectionHeader from 'components/SectionHeader';
import Zone from 'devices/Zone/Zone';

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
        <Group direction="column">
            <SectionHeader title={"Security Zones"} />
            <PageFrame>
                { securityZones.map(endpointId =>
                    <Zone key={ endpointId } endpointId={endpointId} history={historyZone} changeTime={ getChangeTime(endpointId) } />
                )}
            </PageFrame>
            <SectionHeader title={"Automation Zones"} />
            <PageFrame>
                { automationZones.map(endpointId =>
                    <Zone key={ endpointId } endpointId={endpointId} history={historyZone} changeTime={ getChangeTime(endpointId) } />
                )}
            </PageFrame>
        </Group>
    )
};

export default ZoneLayout;
