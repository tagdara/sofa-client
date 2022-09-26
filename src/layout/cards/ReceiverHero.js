import React from 'react';
import Receiver from 'devices/Receiver/Receiver';
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import StackCard from 'layout/components/StackCard'

const ReceiverHero = props => {

    const receiver = endpointIdByFriendlyName('Receiver')

    return (
        <StackCard key={receiver} hidden={props.hidden}>
            <Receiver endpointId={receiver} wide={props.wide} key={receiver} />
        </StackCard>
    )
}

export default ReceiverHero;