import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import { Group, Button } from '@mantine/core';

const MonitorButtonStack = props => {
    
    // Need these props:
    // name - actual text name of button or device
    // label - label for button
    // defaultInput - name of default input
    // outlet - name of outlet device

    const { modeLabel: energyLabel } = useMode(props.outletEndpointId, 'Energy Level')
    const { mode: monitorInput, modeLabel: monitorInputLabel, setMode } = useMode(props.endpointId, 'Input')

    const offModes = ["Off", "Standby"]

    const monitorDefault = monitorInput === props.defaultInput
    const monitorOff = monitorInputLabel === "Blank"
    const outletStandby = offModes.includes(energyLabel)

    function toggleInput() {
        if (monitorDefault) {
            setMode('Input.I8')
        } else {
            setMode(props.defaultInput)
        }
    }; 
    
    // props.className is required for buttons in a buttongroup that have the HOC in between
    // https://stackoverflow.com/questions/57962146/button-components-inside-buttongroup

    const on = !monitorOff && !outletStandby

    return (
        <Group direction="column" grow spacing={1}>
            <Button onClick={ () => toggleInput() }
                    size="md" compact style={{ margin: 0, fontSize: 12, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, minWidth: 42 }}
                    variant = { on ? "filled" : "light"}
            >
                {props.set + props.label}
            </Button>
            <Button onClick={ () => toggleInput() }
                    size="md" compact style={{ margin: 0, fontSize: 12, borderTopLeftRadius: 0, borderTopRightRadius: 0, minWidth: 42}}
                    variant = { on ? "filled" : "light"}
            >
                {monitorOff ? "" : "pc"+props.label}
            </Button>
        </Group>
    );
}

export default MonitorButtonStack;
