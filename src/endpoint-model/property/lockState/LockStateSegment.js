import React from 'react';
import useLockState from 'endpoint-model/property/lockState/useLockState'
import Segment from 'components/Segment'
import { IconLock, IconLockOpen } from '@tabler/icons';

export default function LockStateSegment(props) {

    const { lockStateBool, lockStateLabel, toggle } = useLockState(props.endpointId, props.value, props.directive)
    
    const lockStateIcon = lockStateBool ? <IconLockOpen size={16} /> : <IconLock size={16} />

    return (
        <Segment size={props.size} color={ (props.icon && !props.color && lockStateBool ) ? 'orange' : undefined } onClick={toggle} >{ props.icon ? lockStateIcon : lockStateLabel }</Segment>
    );
}

