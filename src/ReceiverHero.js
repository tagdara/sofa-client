import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import Receiver from './devices/receiver';

export default function ReceiverHero(props) {
    
    const { deviceStatesByCategory } = useContext(DataContext);
    const deviceStates = deviceStatesByCategory('RECEIVER')
    const MemoReceiver = React.memo(Receiver)

    return (
        deviceStates.map(device => 
            <MemoReceiver wide={props.wide} key={device.endpointId} device={ device } />
        )
    );
    
}
