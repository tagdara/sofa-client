import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../DataContext/DataProvider';

import Shade from './Shade';

export default function ShadeList(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices, directive } = useContext(DataContext);
    const [ shades, setShades]=useState([])

    useEffect(() => {
        setShades(getEndpointIdsByCategory('INTERIOR_BLIND','ShadeList'))
        return function cleanup() {
            unregisterDevices('ShadeList');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    return (
        cardReady('ShadeList') ?
            <React.Fragment>
                { shades.map( shade => (
                    <Shade inList={true} device={devices[shade]}  deviceState={ deviceStates[shade] } nested={props.nested} directive={directive} key={ shade }  />
                ))}
            </React.Fragment>
        : null 
    );
}
