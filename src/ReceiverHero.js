import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import Receiver from './devices/receiver';

export default function ReceiverHero(props) {
    
    const { devicesByCategory } = useContext(DataContext);
    const devices = devicesByCategory('RECEIVER')

    return (
        <React.Fragment>
            { devices.map((device) => (
                <Receiver wide={props.wide} key={device.endpointId} device={ device } />
                ))
            }
        </React.Fragment> 
    );
    
}
