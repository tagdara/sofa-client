import React from 'react';
import Mode from 'devices/Mode/Mode';
import GridSection from 'components/GridSection';
import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers'

const ModeLayout = props => {

    const devices = sortByName(endpointIdsByDisplayCategory('MODE'))

    //const lights = props.lights ? props.lights : sortByName(endpointIdsByCategory('LIGHT'))

    return (    
        <GridSection name={"Modes"} scroll={true}>
            { devices.map( endpointId =>
                <Mode key={ endpointId } endpointId={endpointId} small={true} />
            )}
        </GridSection>
    )
}

export default ModeLayout;
