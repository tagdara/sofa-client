import React from 'react';
import { Avatar } from '@mantine/core';
import useTemperature from 'device-model/property/temperature/useTemperature'
import { IconCloudOff } from '@tabler/icons';

const TemperatureAvatar = props => {
    
    const { temperature, temperatureColor } = useTemperature(props.endpointId)

    return (
        <Avatar size={ props.size ? props.size : 'lg' } color={temperatureColor} onClick={props.onClick}>
            { temperature ? temperature + "°" : <IconCloudOff /> }
        </Avatar>
    );
}

export default TemperatureAvatar;
