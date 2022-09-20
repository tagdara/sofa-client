import React from 'react';
import CardPopover from 'components/CardPopover'
import TargetSetpointAdjuster from 'endpoint-model/property/targetSetpoint/TargetSetpointAdjuster'
import ThermostatModeButtons from 'endpoint-model/property/thermostatMode/ThermostatModeButtons'
import ToggleStateSwitch from 'endpoint-model/property/toggleState/ToggleStateSwitch'
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
                <ToggleStateSwitch endpointId={props.endpointId} instance={"Fan.NightMode"} label={"Night Mode"} />
            </Stack>
        </CardPopover>
    );
}

export default TargetSetpointPopover

