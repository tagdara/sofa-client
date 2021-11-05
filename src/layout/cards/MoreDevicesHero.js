import React from 'react';
import FanIcon from '@material-ui/icons/Toys';
import CardBase from 'components/CardBase';
import Device from 'devices/Device';
import Shade from 'devices/Shade/Shade';
import { endpointIdsByFriendlyName, endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers'

const MoreDevicesHero = props => {
    
    const shades = sortByName(endpointIdsByDisplayCategory('INTERIOR_BLIND'))    
    const fans = endpointIdsByFriendlyName(['Bathroom Fan', 'Bathroom Heat Fan'])

    console.log(shades, fans)

    return (
        <CardBase>
            { shades.map( shade => (
                <Shade key={shade} endpointId={shade} />
            ))}
            { fans.map(fan =>
                <Device key={fan} endpointId={fan} icon={<FanIcon />} nested={true} />
            )}
        </CardBase>
    );
}

MoreDevicesHero.defaultProps = {
    showDetail: true,
}

export default MoreDevicesHero;
