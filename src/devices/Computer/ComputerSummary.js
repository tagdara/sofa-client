import React, { useEffect } from 'react';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SofaListItem from 'components/SofaListItem';

import useDeviceStateStore from 'store/deviceStateStore'
import { compareState, endpointIdsByFriendlyName, register, unregister } from 'store/deviceHelpers'

const ComputerSummary = props => {

    const outlets = endpointIdsByFriendlyName(props.outlets)
    const states = useDeviceStateStore( state => Object.fromEntries(outlets.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))

    useEffect(() => {
        register(outlets, 'ComputerSummary')
        return function cleanup() {
            unregister(outlets, 'ComputerSummary')
        };
    // eslint-disable-next-line 
    }, [])

    function onCount() {
        // Checks first to see if the outlet is on, then whether or not there is significant
        // energy use.

        var onDevs = 0;
        for (var dev in states) {
            var outlet = states[dev]
            if ( states[dev] ) {
                if (outlet && outlet.PowerController.powerState.value === 'ON') {
                    if (outlet.hasOwnProperty('Energy Level')) {
                        if (outlet['Energy Level'].mode.value !== 'Standby') {
                            onDevs += 1
                        }
                    } else {
                        onDevs += 1
                    }
                }
            }
        }
        return onDevs
    }

    function countLabel() {
        try {
            if ( onCount() === 1 ) {
                return onCount()+" computer on"
            }
            if (onCount()>0) {
                return onCount()+" computers on"
            }
            return "All computers off"
        }
        catch {}
        return "Computers"
    }

    return (
        <SofaListItem   avatar={<DesktopWindowsIcon />} 
                        onClick={ props.onClick } 
                        avatarState={ onCount() ? 'on' : 'off'}
                        primary={ countLabel() }  
                    />
    );
}

export default ComputerSummary;
