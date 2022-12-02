import React from 'react';
import Posture from 'devices/Posture/Posture';
import SectionHeader from 'layout/section/SectionHeader';
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import PageFrame from 'layout/PageFrame'
import { endpointIdsByDisplayCategory, sortByName } from 'endpoint-model/discovery'

const ModeLayout = props => {

    const devices = sortByName(endpointIdsByDisplayCategory('POSTURE'))

    return (    
        <PageFrame>
            <SectionHeader title={"Postures"} />
            <SectionFrame>
                <SectionGrid>
                { devices.map( endpointId =>
                    <Posture key={ endpointId } endpointId={endpointId} />
                )}
                </SectionGrid>
            </SectionFrame>
        </PageFrame>
    )
}

export default ModeLayout;
