import React from 'react';
import { directive } from 'store/directive'
import { Button, Group, Text, ThemeIcon } from '@mantine/core'
import { ChevronUp, ChevronDown } from 'react-feather'
import CardPopover from 'beta/components/CardPopover'

const TargetSetpointPopover = props => {

    const setpoint = props.setpoint

    const change = amount => {
        const newSetpoint = setpoint + amount
        directive(props.endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": newSetpoint, "scale": "FAHRENHEIT"}} )
    }

    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
        >
        <Group direction="column">
            <Text>Thermostat Setpoint</Text>
            <Group spacing={4} position="center" style={{ width: "100%"}}>
                <ThemeIcon variant="light" size="lg" onClick={ () => change(-1) }>
                    <ChevronDown size={20} />
                </ThemeIcon >
                <Button compact size="lg" variant="light">{ props.setpoint }</Button>
                <ThemeIcon variant="light" size="lg" onClick={ () => change(1) }>
                    <ChevronUp size={20} />
                </ThemeIcon >
            </Group>
        </Group>
        </CardPopover>
    );

}

export default TargetSetpointPopover

