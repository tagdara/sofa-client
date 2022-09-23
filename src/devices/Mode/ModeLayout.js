import React from 'react';
import Mode from 'devices/Mode/Mode';
import SectionHeader from 'layout/section/SectionHeader';
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import PageFrame from 'layout/PageFrame'
import HomeButton from 'layout/HomeButton';
import { endpointIdsByDisplayCategory, sortByName } from 'endpoint-model/discovery'

const ModeLayout = props => {

    const devices = sortByName(endpointIdsByDisplayCategory('MODE'))

    return (    
        <PageFrame>
            <SectionHeader title={"Modes"} />
            <SectionFrame>
                <SectionGrid>
                { devices.map( endpointId =>
                    <Mode key={ endpointId } endpointId={endpointId} />
                )}
                </SectionGrid>
            </SectionFrame>
            <SectionHeader>
                <HomeButton />
            </SectionHeader>
        </PageFrame>
    )
}

export default ModeLayout;
