import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import useLayoutStore from 'layout/layoutStore'
import PullUpCard from 'layout/pullup/PullUpCard'
import { Stack, Text } from '@mantine/core'

import ColorTemperatureSlider from 'endpoint-model/property/colorTemperatureInKelvin/ColorTemperatureSlider'
import BrightnessSlider from 'endpoint-model/property/brightness/BrightnessSlider'
import ColorSlider from 'endpoint-model/property/color/ColorSlider'
import OnLevelSlider from 'endpoint-model/instance/OnLevelSlider'
import { hasCapability } from 'endpoint-model/discovery'


const LightSheet = props => {
    const name = friendlyNameByEndpointId(props.endpointId) 
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const noControllers = !hasCapability(props.endpointId,'BrightnessController') && !hasCapability(props.endpointId,'ColorController') && !hasCapability(props.endpointId,'ColorTemperatureController')

    return (
        <PullUpCard title={name} name={props.name} mounted={ stackPullUp === name } >
                { noControllers ?
                    <Stack spacing={"xl"} style={{ padding: 8 }}>
                        <Text>{"No additional configuration is available"}</Text>
                    </Stack>
                :
                    <Stack spacing={"xl"} style={{ padding: 8 }}>
                        <BrightnessSlider endpointId={props.endpointId} icon={true} />
                        <ColorTemperatureSlider endpointId={props.endpointId} icon={true} />
                        <ColorSlider endpointId={props.endpointId} icon={true} />
                        <OnLevelSlider endpointId={props.endpointId} icon={true} />
                    </Stack>
            }
        </PullUpCard>
    );
}

export default LightSheet;
