import React from 'react';
import { Group} from '@mantine/core'
import ModeSegment from 'device-model/property/mode/ModeSegment'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'

const PlugPopover = props => {

    return (
        <Group>
            <ModeSegment endpointId={props.endpointId} instance={"Energy Level"} />
            <PowerStateSwitch endpointId={props.endpointId} />
        </Group>
    );

}

export default PlugPopover

