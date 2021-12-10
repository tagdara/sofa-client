import React, { useEffect } from 'react';
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { Group, Button } from '@mantine/core';
import { register, unregister } from 'store/deviceHelpers'

const MonitorButtonStack = props => {
    
    // Need these props:
    // name - actual text name of button or device
    // label - label for button
    // defaultInput - name of default input
    // outlet - name of outlet device

    const outlet = useDeviceStateStore( state => state.deviceStates[props.outletEndpointId])
    const monitor = useDeviceStateStore( state => state.deviceStates[props.endpointId])

    useEffect(() => {
        register([props.endpointId, props.outletEndpointId], 'MonitorButton-'+props.endpointId)
        return function cleanup() {
            unregister([props.endpointId, props.outletEndpointId], 'MonitorButton-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])


    if (!outlet || !monitor) {  return null }

    const monitorDefault = monitor && monitor.Input.mode.value === props.defaultInput
    const monitorOff = monitor.Input.mode.value === "Input.I8"
    const outletOn = outlet && outlet.PowerController.powerState.value === "ON"
    const outletStandby = outlet && outlet.hasOwnProperty('Energy Level') && outlet['Energy Level'].mode.value === "Standby"

    function toggleInput(devicename) {
        if (monitorDefault) {
            directive(props.endpointId, "ModeController", 'SetMode', { "mode": 'Input.I8' }, {}, 'Matrix.Input' )
        } else {
            directive(props.endpointId, "ModeController", 'SetMode', { "mode": props.defaultInput }, {}, 'Matrix.Input' )
        }
    }; 
    
    // props.className is required for buttons in a buttongroup that have the HOC in between
    // https://stackoverflow.com/questions/57962146/button-components-inside-buttongroup

    const on = !monitorOff && outletOn && !outletStandby

    return (
        <Group direction="column" grow spacing="xs">
            <Button onClick={ () => toggleInput(props.name, props.defaultInput) }
                    size="xs" compact
                    variant = { on ? "filled" : "light"}
            >
                {props.label}
            </Button>
            <Button onClick={ () => toggleInput(props.name, props.defaultInput) }
                    size="xs" compact
                    variant = { on ? "filled" : "light"}
            >
                {monitorOff ? "." : "pc"+props.label}
            </Button>
        </Group>
    );
}

export default MonitorButtonStack;
