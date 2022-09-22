import React from 'react';
import { Button } from '@mantine/core'
import useTargetSetpoint from 'endpoint-model/property/targetSetpoint/useTargetSetpoint'
import { IconChevronDown, IconChevronUp} from '@tabler/icons';

const TargetSetpointAdjuster = props => {

    const { targetSetpoint, decreaseSetpoint, increaseSetpoint } = useTargetSetpoint(props.endpointId, props.value, props.directive)

    return (
        <Button.Group buttonBorderWidth={0} >
            <Button size="sm" variant={"light"} onClick={ () => decreaseSetpoint(1) }>
                <IconChevronDown size={20} />
            </Button>
            <Button size="sm" variant={"light"}>
                { targetSetpoint }
            </Button>
            <Button size="sm" variant={"light"} onClick={ () => increaseSetpoint(1) }>
                <IconChevronUp size={20} />
            </Button>
        </Button.Group>
    );
}

export default TargetSetpointAdjuster

