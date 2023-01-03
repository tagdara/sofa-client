import React from 'react';
import PullUpCard from 'layout/pullup/PullUpCard'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import WeatherList from 'devices/Weather/WeatherList'

const WeatherPullUp = props => {

    const name = friendlyNameByEndpointId(props.endpointId) 

    return (      
        <PullUpCard name={name} title={ props.title ? props.title : name }  >
            <WeatherList endpointId={props.endpointId} />
        </PullUpCard>
    );

}

export default WeatherPullUp

