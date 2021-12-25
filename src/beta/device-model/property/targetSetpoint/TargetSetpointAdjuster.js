import React from 'react';
import { Button, Group, ActionIcon } from '@mantine/core'
import { ChevronUp, ChevronDown } from 'react-feather'
import useTargetSetpoint from 'beta/device-model/property/targetSetpoint/useTargetSetpoint'

const TargetSetpointAdjuster = props => {

    const { targetSetpoint, decreaseSetpoint, increaseSetpoint } = useTargetSetpoint(props.endpointId)

    return (
            <Group spacing={4} position="center">
                <ActionIcon variant="light" size="lg" onClick={ () => decreaseSetpoint(1) }>
                    <ChevronDown size={20} />
                </ActionIcon >
                <Button compact size="lg" variant="light">{ targetSetpoint }</Button>
                <ActionIcon variant="light" size="lg" onClick={ () => increaseSetpoint(1) }>
                    <ChevronUp size={20} />
                </ActionIcon >
            </Group>
    );
}

export default TargetSetpointAdjuster

