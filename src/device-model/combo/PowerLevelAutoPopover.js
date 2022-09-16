import React from 'react';
import CardPopover from 'components/CardPopover'
import { Stack } from '@mantine/core';
import PowerLevelSlider from 'device-model/property/powerLevel/PowerLevelSlider'
import ToggleStateSwitch from 'device-model/property/toggleState/ToggleStateSwitch'

const PowerLevelAutoPopover = props => {

    // This is used for Dyson devices with a fan speed and an 'AUTO' setting
    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
                withinPortal={true}
                width={240}
        >
            <Stack spacing="xl">
                <PowerLevelSlider endpointId={props.endpointId} on={!props.sliderDisabled} />
                <ToggleStateSwitch size="sm" endpointId={props.endpointId} instance={props.instance} label={"Auto"} />
            </Stack>
        </CardPopover>
    );
}

export default PowerLevelAutoPopover

