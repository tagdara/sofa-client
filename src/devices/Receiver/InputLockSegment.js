import React from 'react';
import { IconLock, IconLockOpen } from '@tabler/icons';
import useMode from 'endpoint-model/property/mode/useMode'
import Segment from 'layout/components/Segment'


const InputLockSegment = props => {

    // should eventually be changed to a toggle
  
    const { mode, setMode } = useMode(props.endpointId, 'Input.Lock')
    const locked = mode === 'Lock.Locked' 

    const modeToggleClick = ( event) => {
        event.stopPropagation()
        console.log('mode', mode, locked)
        setMode( locked ? 'Lock.Unlocked' : 'Lock.Locked')
    }

    if (props.text) {
        return locked ? <IconLock size={12} /> : null 
    }

    return (
        <Segment size={props.size} color={ locked ? "primary" : undefined } variant={ locked ? "filled" : "light"} onClick={modeToggleClick} >
            { locked ? <IconLock size={12} /> : <IconLockOpen size={12} /> }
        </Segment>
    );

}


export default InputLockSegment;
