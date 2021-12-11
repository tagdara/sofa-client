import React from 'react';
import Receiver from 'beta/devices/Receiver/Receiver';
import PlaceholderCard from 'beta/layout/PlaceholderCard';
import { endpointIdsByDisplayCategory } from 'store/deviceHelpers'
import { Text } from '@mantine/core'
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