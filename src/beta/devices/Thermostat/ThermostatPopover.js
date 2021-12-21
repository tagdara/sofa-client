import React from 'react';
import CardPopover from 'beta/components/CardPopover'
import TargetSetpointAdjuster from 'beta/device-model/property/targetSetpoint/TargetSetpointAdjuster'
import ThermostatModeButtons from 'beta/device-model/property/thermostatMode/ThermostatModeButtons'
import { Group } from '@mantine/core';
const TargetSetpointPopover = props => {

    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
        >
            <Group position="center" direction="column" noWrap>
                <ThermostatModeButtons endpointId={props.endpointId} />
                <TargetSetpointAdjuster endpointId={props.endpointId} />
            </Group>
        </CardPopover>
    );
}

export default TargetSetpointPopover

