import React from 'react';
import PullUpCard from 'layout/pullup/PullUpCard'
import { Stack } from '@mantine/core'
import TargetSetpointLine from 'endpoint-model/property/targetSetpoint/TargetSetpointLine'
import ThermostatModeLine from 'endpoint-model/property/thermostatMode/ThermostatModeLine'
import ToggleStateLine from 'endpoint-model/property/toggleState/ToggleStateLine'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import { IconMoon } from '@tabler/icons';
import PowerLevelSliderLine from 'endpoint-model/property/powerLevel/PowerLevelSliderLine'

const ThermostatPullUp = props => {

    const name = friendlyNameByEndpointId(props.endpointId) 

    return (
        <PullUpCard name={name} title={name}  >
            <Stack spacing="xl">
                <ThermostatModeLine icon label endpointId={props.endpointId} />
                <TargetSetpointLine icon label endpointId={props.endpointId} />
                <ToggleStateLine 
                    icon={ <IconMoon size={20} />}
                    endpointId={props.endpointId} 
                    instance={"Fan.NightMode"} 
                    label={"Night Mode"} 
                />
                <PowerLevelSliderLine icon label endpointId={props.endpointId} />
            </Stack>
        </PullUpCard>
    );
}

export default ThermostatPullUp
