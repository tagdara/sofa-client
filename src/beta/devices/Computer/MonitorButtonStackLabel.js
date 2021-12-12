import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { compareState, endpointIdsByFriendlyName, register, unregister } from 'store/deviceHelpers'
import { Button, Group } from '@mantine/core';
import { Monitor, HardDrive } from 'react-feather'
const MonitorButtonStackLabel = props => {

    const outlets = endpointIdsByFriendlyName(props.outlets)
    const states = useDeviceStateStore( state => Object.fromEntries(outlets.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))

    useEffect(() => {
        register(outlets, 'MonitorButtonStackLabel')
        return function cleanup() {
            unregister(outlets, 'MonitorButtonStackLabel')
        };
    // eslint-disable-next-line 
    }, [])

    if (!states) { return null }

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
    
    return (
        <Group direction="column" spacing="xs">
            <Button variant={ "outlined "}
                    style={{ borderWidth: 0 }}
                    size="xs" compact
                    onClick={ props.topClick } 
                    rightIcon={<Monitor size={16}/>}
            >
                { onCount() }
            </Button>
            <Button variant={ "outlined "}
                    style={{ borderWidth: 0 }}
                    size="xs" compact
                    onClick={ props.bottomClick } 
                    rightIcon={<HardDrive size={16} />}
            >
                { onCount() }
            </Button>
        </Group>
    );
}

export default MonitorButtonStackLabel;
