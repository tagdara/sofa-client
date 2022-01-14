import React from 'react';
import useLockState from 'device-model/property/lockState/useLockState'
import Segment from 'components/Segment'
import { Lock, Unlock } from 'react-feather'

export default function LockStateSegment(props) {

    const { lockStateBool, lockStateLabel, toggle } = useLockState(props.endpointId, props.value, props.directive)
    
    const lockStateIcon = lockStateBool ? <Unlock size={16} /> : <Lock size={16} />

    return (
        <Segment size={props.size} color={ (props.icon && !props.color && lockStateBool ) ? 'orange' : undefined } onClick={toggle} >{ props.icon ? lockStateIcon : lockStateLabel }</Segment>
    );
}

