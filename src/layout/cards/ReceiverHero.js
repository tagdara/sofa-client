import React from 'react';
import Receiver from 'devices/Receiver/Receiver';
import PlaceholderCard from 'layout/PlaceholderCard';
import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import StackCard from 'layout/components/StackCard'

const ReceiverHero = props => {

    const receivers = endpointIdsByDisplayCategory('RECEIVER')
    if (!receivers) { return <PlaceholderCard count={1} /> }

    return (
        <>
            { receivers.map( receiver => 
                <StackCard key={receiver} hidden={props.hidden}>
                    <Receiver endpointId={receiver} wide={props.wide} key={receiver} />
                </StackCard>
            )}
        </>
    )
}

export default ReceiverHero;