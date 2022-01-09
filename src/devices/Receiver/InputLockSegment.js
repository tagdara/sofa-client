import React from 'react';
import { Lock, Unlock } from 'react-feather'
import useMode from 'device-model/property/mode/useMode'
import Segment from 'components/Segment'


const InputLockSegment = props => {

    // should eventually be changed to a toggle
  
    const { mode, setMode } = useMode(props.endpointId, 'Receiver.InputLock')
    const locked = mode === 'InputLock.Locked' 

    const modeToggleClick = ( event) => {
        event.stopPropagation()
        console.log('mode', mode, locked)
        setMode( locked ? 'InputLock.Unlocked' : 'InputLock.Locked')
    }

    return (
        <Segment color={ locked ? "primary" : undefined } variant={ locked ? "filled" : "light"} onClick={modeToggleClick} >
            { locked ? <Lock size={16} /> : <Unlock size={16} /> }
        </Segment>
    );

}


export default InputLockSegment;
