import React from 'react';
import { Group, Text} from '@mantine/core'
import CardPopover from 'components/CardPopover'

import ColorTemperatureSlider from 'device-model/property/colorTemperatureInKelvin/ColorTemperatureSlider'
import BrightnessSlider from 'device-model/property/brightness/BrightnessSlider'
import ColorSlider from 'device-model/property/color/ColorSlider'
import { hasCapability } from 'store/deviceHelpers'

const LightPopover = props => {

    const noControllers = !hasCapability(props.endpointId,'BrightnessController') && !hasCapability(props.endpointId,'ColorController') && !hasCapability(props.endpointId,'ColorTemperatureController')

    return (
        <CardPopover
                opened={props.open}
                setOpen={props.setOpen}
                target={ props.target }

            >
                { noControllers ?
                    <Text>{"No additional configuration is available"}</Text>
                :
                    <Group direction="column" grow spacing={"xl"}>
                        <BrightnessSlider endpointId={props.endpointId} icon={true} />
                        <ColorTemperatureSlider endpointId={props.endpointId} icon={true} />
                        <ColorSlider endpointId={props.endpointId} icon={true} />
                    </Group>
            }
        </CardPopover>
    );

}

export default LightPopover

