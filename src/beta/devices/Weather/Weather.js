import React from 'react';
import ModeControllerText from 'beta/device-model/controller/ModeController/ModeControllerText'
import ForecastAvatar from 'beta/devices/Thermostat/ForecastAvatar'
import TemperatureSensorAvatar from 'beta/device-model/controller/temperatureSensor/TemperatureSensorAvatar'
import WeatherAvatar from 'beta/devices/Weather/WeatherAvatar'
import { endpointIdByFriendlyName } from 'store/deviceHelpers'
import { Group } from '@mantine/core';

export default function Weather(props) { 

    const currentDevice = endpointIdByFriendlyName(props.current)
    const forecastDevice = endpointIdByFriendlyName(props.forecast)

    return (
        <Group direction="column" noWrap style={{ width: "100%"}}>
            <Group  direction="row" noWrap onClick={props.onClick} style={{ width: "100%"}} >
                <TemperatureSensorAvatar endpointId={currentDevice} />
                <Group direction="column" spacing={2}>
                    <ModeControllerText size="lg" endpointId={forecastDevice} instance={"Weather Condition"} />
                    <ForecastAvatar endpointId={forecastDevice} currentTemp={currentDevice}  />
                </Group>
                <WeatherAvatar endpointId={forecastDevice} size="lg" />
            </Group>
        </Group>
    );
}

//    return (
 //           <Group position="apart" onClick={props.onClick} >
//                <AirQualityChip endpointId={indoorAQ} instance={"Air Quality"} suffix={"Indoor AQ"} />
//                <AirQualityChip endpointId={outdoorAQ} instance={"AQI"} prefix={"AQI"} />
//            </Group>
//    );
//}


