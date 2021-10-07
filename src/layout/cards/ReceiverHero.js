import React, { useContext } from 'react';
import { DeviceContext } from 'context/DeviceContext';
import Receiver from 'devices/Receiver/Receiver';
import PlaceholderCard from 'layout/PlaceholderCard';

const ReceiverHero = props => {

    const { devicesByCategory } = useContext(DeviceContext);
    const receivers =  devicesByCategory('RECEIVER')

    if (!receivers) {
        return <PlaceholderCard count={1} />
    }

    return (
        <>
            { receivers.map( receiver => 
                <Receiver endpointId={receiver.endpointId} wide={props.wide} key={receiver.endpointId} />
            )}
        </>
    )
}

export default ReceiverHero;