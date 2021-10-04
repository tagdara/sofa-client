import React, { useState, useEffect, useContext } from 'react';

import FanIcon from '@material-ui/icons/Toys';

import { DataContext } from 'DataContext/DataProvider';
import CardBase from 'components/CardBase';
import Device from 'devices/Device';
import PlaceholderCard from 'layout/PlaceholderCard';
import Shade from 'devices/Shade/Shade';


export default function MoreDevicesHero(props) {
    
    const { cardReady, cardDevices, devices, deviceStates, getEndpointIdsByCategory, getEndpointIdsByFriendlyName, unregisterDevices, directive } = useContext(DataContext);
    const switchNames=['Bathroom Fan','Bathroom Heat Fan']
    const [ switches, setSwitches]=useState([])
    const [ shades, setShades]=useState([])
    
    useEffect(() => {
        setShades(getEndpointIdsByCategory('INTERIOR_BLIND','MoreDevicesHero'))
        setSwitches(getEndpointIdsByFriendlyName(switchNames, 'MoreDevicesHero', true))
        return function cleanup() {
            unregisterDevices('MoreDevicesHero');
        };
    // eslint-disable-next-line 
    }, [ ] )


    if (!cardReady('MoreDevicesHero')) {
        return <PlaceholderCard count={cardDevices('MoreDevicesHero').length} />
    }

    return (
        <CardBase>
            { shades.map( shade => (
                <Shade  nested={true} inList={true} device={devices[shade]}  deviceState={ deviceStates[shade] } directive={directive} key={ shade }  />
            ))}
            { switches.map(switchId =>
                <Device nested={true} icon={<FanIcon />} key={ switchId } device={ devices[switchId] } deviceState={deviceStates[switchId]} directive={directive} />
            )}
        </CardBase>
    );
}

MoreDevicesHero.defaultProps = {
    showDetail: true,
}
