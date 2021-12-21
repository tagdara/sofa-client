import React from 'react';
import WeatherIcon from 'beta/devices/Weather/WeatherIcon'
import { Avatar } from '@mantine/core';

export default function WeatherAvatar(props) {

    return (
        <Avatar size={props.size}>
            <WeatherIcon endpoint={props.endpointId} />
        </Avatar>
    );
}


