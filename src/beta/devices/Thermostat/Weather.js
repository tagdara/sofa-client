import React from 'react';
import ModeControllerText from 'beta/device-model/controller/ModeController/ModeControllerText'
import ForecastAvatar from 'beta/devices/Thermostat/ForecastAvatar'
import TemperatureSensorAvatar from 'beta/device-model/controller/temperatureSensor/TemperatureSensorAvatar'
//import AirQualityChip from 'devices/Thermostat/AirQualityChip'
import StackCard from 'beta/components/StackCard'

import { endpointIdByFriendlyName } from 'store/deviceHelpers'
import { Avatar, Group } from '@mantine/core';
import { Cloud } from 'react-feather'

export default function Weather(props) { 

    const currentDevice = endpointIdByFriendlyName(props.current)
    const forecastDevice = endpointIdByFriendlyName(props.forecast)
    //const indoorAQ = endpointIdByFriendlyName(props.indoorAirQuality)
    //const outdoorAQ = endpointIdByFriendlyName(props.outdoorAirQuality)

    return (
        <StackCard >
            <Group direction="column" noWrap style={{ width: "100%"}}>
                <Group position="apart" direction="row" grow noWrap onClick={props.onClick} style={{ width: "100%"}} >
                    <TemperatureSensorAvatar endpointId={currentDevice} />
                    <Group direction="row" noWrap style={{ alignItems: "center"}}>
                        <Avatar><Cloud  /></Avatar>
                        <Group direction="column" spacing={2}>
                            <ModeControllerText size="xs" endpointId={forecastDevice} instance={"Weather Condition"} />
                            <ForecastAvatar endpointId={forecastDevice} currentTemp={currentDevice}  />
                        </Group>
                    </Group>
                </Group>
            </Group>
        </StackCard>
    );
}

//    return (
//        <Card >
//            <Group onClick={props.onClick} >
//                <TemperatureSensorAvatar endpointId={currentDevice} />
//                <ModeControllerText endpointId={forecastDevice} instance={"Weather Condition"} />
//                <ForecastAvatar endpointId={forecastDevice} />
//            </Group>
 //           <Group position="apart" onClick={props.onClick} >
//                <AirQualityChip endpointId={indoorAQ} instance={"Air Quality"} suffix={"Indoor AQ"} />
//                <AirQualityChip endpointId={outdoorAQ} instance={"AQI"} prefix={"AQI"} />
//            </Group>
//        </Card>
//    );
//}


