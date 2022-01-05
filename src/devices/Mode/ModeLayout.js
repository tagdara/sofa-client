import React from 'react';
import Mode from 'devices/Mode/Mode';
import SectionHeader from 'layout/SectionHeader';
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import PageFrame from 'layout/PageFrame'
import HomeButton from 'layout/HomeButton';
import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers'

const ModeLayout = props => {

    const devices = sortByName(endpointIdsByDisplayCategory('MODE'))

    //const lights = props.lights ? props.lights : sortByName(endpointIdsByCategory('LIGHT'))

    return (    
        <PageFrame>
            <SectionHeader title={"Modes"} />
            <SectionFrame>
                <SectionGrid>
                { devices.map( endpointId =>
                    <Mode key={ endpointId } endpointId={endpointId} small={true} />
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
