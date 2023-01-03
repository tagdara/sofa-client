import React from 'react';
import ModeControllerText from 'endpoint-model/controller/ModeController/ModeControllerText'
import ForecastAvatar from 'devices/Weather/ForecastAvatar'
import WeatherIcon from 'devices/Weather/WeatherIcon'
import WideAvatar from 'layout/components/WideAvatar'
import AQIBadge from 'endpoint-model/instance/AQIBadge'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import { Group, Stack} from '@mantine/core';
import useTemperature from 'endpoint-model/property/temperature/useTemperature'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import { IconBatteryOff } from '@tabler/icons';

export default function Weather(props) { 

    const aqEndpoint = props.aq ? endpointIdByFriendlyName(props.aq) : undefined
    const { temperatureColor, temperatureLabel } = useTemperature(props.current)

    const { reachable } = useEndpointHealth(props.current)

    return (
        <Stack>
            <Group noWrap onClick={props.onClick}>
                { reachable ? 
                    <WideAvatar color={temperatureColor} 
                                size="lg"
                                left={ <WeatherIcon size="24" instance={"Weather.Condition"} endpointId={props.forecastEndpointId} /> }
                                right={ temperatureLabel }
                    />
                :
                    <WideAvatar color="gray" 
                                size="lg"
                                left={ <IconBatteryOff size="24" /> }
                                right={ "?" }
                    />
                }   
                <Stack spacing={2}>
                    <ModeControllerText size="lg" endpointId={props.forecastEndpointId} instance={"Weather.Condition"} />
                    <Group noWrap style={{ width: "100%"}}>
                        <ForecastAvatar size={"sm"} dimmed endpointId={props.forecastEndpointId} currentTemp={props.current}  />
                        { aqEndpoint && <AQIBadge size="md" endpointId={aqEndpoint} instance={"Air.AQI"} prefix={"AQI"} /> }
                    </Group>
                </Stack>
            </Group>
        </Stack>
    );
}
