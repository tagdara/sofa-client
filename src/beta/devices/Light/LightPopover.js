import React from 'react';
import { directive } from 'store/directive'
import { Group, Text} from '@mantine/core'
import CardPopover from 'beta/components/CardPopover'

import LightSliderTemperature from 'beta/devices/Light/LightSliderTemperature'
import BrightnessSlider from 'beta/device-model/property/brightness/BrightnessSlider'
import LightSliderColor from 'beta/device-model/property/color/ColorSlider'

const LightPopover = props => {

    const light = props.light

    if (!light) { return null }

    const noControllers = !light.BrightnessController && !light.ColorController && !light.ColorTemperatureController

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
                        { light.BrightnessController &&
                            <BrightnessSlider endpointId={props.endpointId} />
                        }
                        { light.ColorTemperatureController &&
                            <LightSliderTemperature endpointId={props.endpointId} deviceState={light} directive={directive} />
                        }
                        { light.ColorController &&
                            <LightSliderColor endpointId={props.endpointId} deviceState={light} directive={directive} />
                        }
                    </Group>
            }
        </CardPopover>
    );

}

export default LightPopover

