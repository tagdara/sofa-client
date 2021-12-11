import React from 'react';
import ModeControllerText from 'beta/device-model/controller/ModeController/ModeControllerText'
import ForecastAvatar from 'beta/devices/Thermostat/ForecastAvatar'
import TemperatureSensorAvatar from 'beta/device-model/controller/temperatureSensor/TemperatureSensorAvatar'
import AirQualityBadge from 'beta/device-model/instance/AirQualityBadge'
import StackCard from 'beta/components/StackCard'

import { endpointIdByFriendlyName } from 'store/deviceHelpers'
import { Avatar, Group } from '@mantine/core';
import { Cloud } from 'react-feather'

export default function Weather(props) { 

    const currentDevice = endpointIdByFriendlyName(props.current)
    const forecastDevice = endpointIdByFriendlyName(props.forecast)
    const indoorAQ = endpointIdByFriendlyName(props.indoorAirQuality)
    const outdoorAQ = endpointIdByFriendlyName(props.outdoorAirQuality)

    return (
        <StackCard >
            <Group direction="column" noWrap style={{ width: "100%"}}>
                <Group  direction="row" noWrap onClick={props.onClick} style={{ width: "100%"}} >
                    <TemperatureSensorAvatar endpointId={currentDevice} />
                    <Avatar size="lg"><Cloud  /></Avatar>
                    <Group direction="column" spacing={2}>
                        <ModeControllerText size="lg" endpointId={forecastDevice} instance={"Weather Condition"} />
                        <ForecastAvatar endpointId={forecastDevice} currentTemp={currentDevice}  />
                    </Group>
                </Group>
                <Group position="apart" noWrap style={{ width: "100%"}}>
                    <AirQualityBadge endpointId={outdoorAQ} instance={"AQI"} prefix={"Outdoor AQI"} />
                    <AirQualityBadge endpointId={indoorAQ} instance={"Air Quality"} suffix={"Indoor AQ"} />
                </Group>
            </Group>
        </StackCard>
    );
}

//    return (
 //           <Group position="apart" onClick={props.onClick} >
//                <AirQualityChip endpointId={indoorAQ} instance={"Air Quality"} suffix={"Indoor AQ"} />
//                <AirQualityChip endpointId={outdoorAQ} instance={"AQI"} prefix={"AQI"} />
//            </Group>
//    );
//}


