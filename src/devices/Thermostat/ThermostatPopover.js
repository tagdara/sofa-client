import React from 'react';
import CardPopover from 'components/CardPopover'
import TargetSetpointAdjuster from 'endpoint-model/property/targetSetpoint/TargetSetpointAdjuster'
import ThermostatModeButtons from 'endpoint-model/property/thermostatMode/ThermostatModeButtons'
import { Stack } from '@mantine/core';

const TargetSetpointPopover = props => {

    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
                withinPortal={true}
                width={320}
        >
            <Stack>
                <ThermostatModeButtons endpointId={props.endpointId} />
                <TargetSetpointAdjuster endpointId={props.endpointId} />
            </Stack>
        </CardPopover>
    );
}

export default TargetSetpointPopover

