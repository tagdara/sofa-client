import React from 'react';
import CardBase from 'components/CardBase';
import Fan from 'devices/Fan/Fan';
import Shade from 'devices/Shade/Shade';
import { endpointIdsByFriendlyName, endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers'

const MoreDevicesHero = props => {
    
    const shades = sortByName(endpointIdsByDisplayCategory('INTERIOR_BLIND'))    
    const fans = endpointIdsByFriendlyName(['Bathroom Fan', 'Bathroom Heat Fan'])
    
    return (
        <CardBase>
            { shades.map( shade => (
                <Shade key={shade} endpointId={shade} />
            ))}
            { fans.map(fan =>
                <Fan key={fan} endpointId={fan} nested={true} itemType={"listItem"} />
            )}
        </CardBase>
    );
}

MoreDevicesHero.defaultProps = {
    showDetail: true,
}

export default MoreDevicesHero;
