import React from 'react';
import Receiver from 'devices/Receiver/Receiver';
import PlaceholderCard from 'layout/PlaceholderCard';
import { endpointIdsByDisplayCategory } from 'store/deviceHelpers'

const ReceiverHero = props => {

    const receivers = endpointIdsByDisplayCategory('RECEIVER')
    if (!receivers) { return <PlaceholderCard count={1} /> }

    return (
        <>
            { receivers.map( receiver => 
                <Receiver endpointId={receiver} wide={props.wide} key={receiver} />
            )}
        </>
    )
}

export default ReceiverHero;