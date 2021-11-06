import React from 'react';

import CardBase from 'components/CardBase'
import CardLine from 'components/CardLine'
import CardLineSpacer from 'components/CardLineSpacer'

import ModeControllerText from 'controllers/modeController/ModeControllerText'
import ForecastAvatar from 'devices/Thermostat/ForecastAvatar'
import TemperatureSensorAvatar from 'controllers/temperatureSensor/TemperatureSensorAvatar'
import AirQualityChip from 'devices/Thermostat/AirQualityChip'

import { endpointIdByFriendlyName } from 'store/deviceHelpers'

export default function Weather(props) { 

    const currentDevice = endpointIdByFriendlyName(props.current)
    const forecastDevice = endpointIdByFriendlyName(props.forecast)
    const indoorAQ = endpointIdByFriendlyName(props.indoorAirQuality)
    const outdoorAQ = endpointIdByFriendlyName(props.outdoorAirQuality)

    return (
        <CardBase >
            <CardLine onClick={props.onClick} >
                <TemperatureSensorAvatar endpointId={currentDevice} />
                <ModeControllerText endpointId={forecastDevice} instance={"Weather Condition"} />
                <ForecastAvatar endpointId={forecastDevice} />
            </CardLine>
            <CardLine onClick={props.onClick} short={true} >
                <AirQualityChip endpointId={indoorAQ} instance={"Air Quality"} suffix={"Indoor AQ"} />
                <CardLineSpacer />
                <AirQualityChip endpointId={outdoorAQ} instance={"AQI"} prefix={"AQI"} />
            </CardLine>
        </CardBase>
    );
}


