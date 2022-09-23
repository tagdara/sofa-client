import React from 'react';
import { Stack, Text} from '@mantine/core'
import CardPopover from 'layout/components/CardPopover'

import ColorTemperatureSlider from 'endpoint-model/property/colorTemperatureInKelvin/ColorTemperatureSlider'
import BrightnessSlider from 'endpoint-model/property/brightness/BrightnessSlider'
import ColorSlider from 'endpoint-model/property/color/ColorSlider'
import OnLevelSlider from 'endpoint-model/instance/OnLevelSlider'
import { hasCapability } from 'endpoint-model/discovery'

const LightPopover = props => {

    const noControllers = !hasCapability(props.endpointId,'BrightnessController') && !hasCapability(props.endpointId,'ColorController') && !hasCapability(props.endpointId,'ColorTemperatureController')

    return (
        <CardPopover
                opened={props.open}
                setOpen={props.setOpen}
                target={ props.target }
                withinPortal={true}

            >
                { noControllers ?
                    <Text>{"No additional configuration is available"}</Text>
                :
                    <Stack spacing={"xl"}>
                        <BrightnessSlider endpointId={props.endpointId} icon={true} />
                        <ColorTemperatureSlider endpointId={props.endpointId} icon={true} />
                        <ColorSlider endpointId={props.endpointId} icon={true} />
                        <OnLevelSlider endpointId={props.endpointId} icon={true} />
                    </Stack>
            }
        </CardPopover>
    );

}

export default LightPopover

