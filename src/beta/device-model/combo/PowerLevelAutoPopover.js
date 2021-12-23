import React from 'react';
import CardPopover from 'beta/components/CardPopover'
import { Group } from '@mantine/core';
import PowerLevelSlider from 'beta/device-model/property/powerLevel/PowerLevelSlider'
import ToggleStateSwitch from 'beta/device-model/property/toggleState/ToggleStateSwitch'

const PowerLevelAutoPopover = props => {

    // This is used for Dyson devices with a fan speed and an 'AUTO' setting
    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
        >
            <Group direction="column" noWrap grow spacing="xl">
                <PowerLevelSlider endpointId={props.endpointId} />
                <ToggleStateSwitch size="sm" endpointId={props.endpointId} instance={props.instance} label={"Auto"} />
            </Group>
        </CardPopover>
    );
}

export default PowerLevelAutoPopover

