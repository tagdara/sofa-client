import React, { useContext } from 'react';

import FanIcon from '@material-ui/icons/Toys';

import { DeviceContext } from 'context/DeviceContext';
import CardBase from 'components/CardBase';
import Device from 'devices/Device';
import Shade from 'devices/Shade/Shade';

export default function MoreDevicesHero(props) {
    
    const { endpointIdsByFriendlyName, endpointIdsByCategory, sortByName } = useContext(DeviceContext);
    const shades = sortByName(endpointIdsByCategory('INTERIOR_BLIND'))    
    const fans = endpointIdsByFriendlyName(['Bathroom Fan','Bathroom Heat Fan'])

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
