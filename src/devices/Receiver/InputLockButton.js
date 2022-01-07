import React from 'react';
import { ActionIcon } from '@mantine/core'
import { Lock, Unlock } from 'react-feather'
import useMode from 'device-model/property/mode/useMode'


const InputLockButton = props => {

    // This is similar to a standard Input Select but includes a locking capability based off of 
    // a mode (which should eventually be changed to a toggle)

    // This component is needed to overlay the additional logic

    // A better model would be to have the lock sit next to the control and when locked, disable user
    // changes as well
  
    const { mode, setMode } = useMode(props.endpointId, 'Receiver.InputLock')
    const locked = mode === 'InputLock.Locked' 

    const modeToggleClick = ( event) => {
        event.stopPropagation()
        console.log('mode', mode, locked)
        setMode( locked ? 'InputLock.Unlocked' : 'InputLock.Locked')
    }

    return (
        <ActionIcon size={props.size ? props.size : "md"} color={ locked ? "primary" : undefined } variant={ locked ? "filled" : "light"} onClick={modeToggleClick} >
            { locked ? <Lock size={16} /> : <Unlock size={16} /> }
        </ActionIcon>
    );
}


export default InputLockButton;
