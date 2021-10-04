import React, { useEffect } from 'react';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SofaListItem from 'components/SofaListItem';
import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'

const ComputerSummary = React.memo(props => {

    useEffect(() => {
        props.addEndpointIds('friendlyName', props.outlets, 'ComputerSummary')
        return function cleanup() {
            props.unregisterDevices('ComputerSummary');
        };
    // eslint-disable-next-line 
    }, [])

    function onCount() {
        // Checks first to see if the outlet is on, then whether or not there is significant
        // energy use.

        var onDevs = 0;
        for (var dev in props.deviceState) {
            var outlet = props.deviceState[dev]
            if ( props.deviceState[dev] ) {
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
}, deviceStatesAreEqual);

export default dataFilter(ComputerSummary);
