import React from 'react';
import { ActionIcon } from '@mantine/core'
import useMode from 'endpoint-model/property/mode/useMode'
import { IconLock, IconLockOpen } from '@tabler/icons';

const InputLockButton = props => {

    // This is similar to a standard Input Select but includes a locking capability based off of 
    // a mode (which should eventually be changed to a toggle)

    // This component is needed to overlay the additional logic

    // A better model would be to have the lock sit next to the control and when locked, disable user
    // changes as well
  
    const { mode, setMode } = useMode(props.endpointId, 'Input.Lock')
    const locked = mode === 'Lock.Locked' 

    const modeToggleClick = ( event) => {
        event.stopPropagation()
        setMode( locked ? 'Lock.Unlocked' : 'Lock.Locked')
    }

    return (
        <ActionIcon size={props.size ? props.size : "md"} color={ locked ? "primary" : undefined } variant={ locked ? "filled" : "light"} onClick={modeToggleClick} >
            { locked ? <IconLock size={16} /> : <IconLockOpen size={16} /> }
        </ActionIcon>
    );
}


export default InputLockButton;
