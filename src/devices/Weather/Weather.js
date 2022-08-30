import React from 'react';
import ModeControllerText from 'device-model/controller/ModeController/ModeControllerText'
import ForecastAvatar from 'devices/Weather/ForecastAvatar'
import WeatherIcon from 'devices/Weather/WeatherIcon'
import WideAvatar from 'components/WideAvatar'
import AirQualityBadge from 'device-model/instance/AirQualityBadge'
import { endpointIdByFriendlyName } from 'store/deviceHelpers'
import { Group, Stack} from '@mantine/core';
import useTemperature from 'device-model/property/temperature/useTemperature'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import { Battery } from 'react-bootstrap-icons'

export default function Weather(props) { 

    const currentDevice = endpointIdByFriendlyName(props.current)
    const forecastDevice = endpointIdByFriendlyName(props.forecast)
    const aqEndpoint = props.aq ? endpointIdByFriendlyName(props.aq) : undefined
    const { temperatureColor, temperatureLabel } = useTemperature(currentDevice)

    const { reachable } = useEndpointHealth(currentDevice)

    return (
        <Stack>
            <Group noWrap onClick={props.onClick}>
                { reachable ? 
                    <WideAvatar color={temperatureColor} 
                                size="lg"
                                left={ <WeatherIcon size="24" instance={"Weather Condition"} endpointId={forecastDevice} /> }
                                right={ temperatureLabel }
                    />
                :
                    <WideAvatar color="gray" 
                                size="lg"
                                left={ <Battery size="24" /> }
                                right={ "?" }
                    />
                }   
                <Stack spacing={2}>
                    <ModeControllerText size="lg" endpointId={forecastDevice} instance={"Weather Condition"} />
                    <Group noWrap style={{ width: "100%"}}>
                        <ForecastAvatar size={"sm"} dimmed endpointId={forecastDevice} currentTemp={currentDevice}  />
                        { aqEndpoint && <AirQualityBadge size="md" endpointId={aqEndpoint} instance={"AQI"} prefix={"AQI"} /> }
                    </Group>
                </Stack>
            </Group>
        </Stack>
    );
}
