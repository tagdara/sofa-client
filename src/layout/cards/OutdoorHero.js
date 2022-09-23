import React, { useState } from 'react';
import StackCard from 'layout/components/StackCard'
import Weather from 'devices/Weather/Weather';
import WeatherList from 'devices/Weather/WeatherList'
import { Collapse, Stack } from '@mantine/core';
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'

export default function OutdoorHero(props) {
    
    const [ expanded, setExpanded ] = useState(false)
    const currentDevice = endpointIdByFriendlyName(props.outdoor)

    return (
        <StackCard>
            <Stack style={{ width: "100%"}}>
                <Weather    aq={props.outdoorAirQuality} 
                            current={props.outdoor} 
                            forecast={"Rainmachine"} 
                            onClick={ () => setExpanded(!expanded) }
                />  
                <Collapse in={expanded} style={{width: "100%"}}>
                    <WeatherList endpointId={currentDevice} />
                </Collapse>
            </Stack>
        </StackCard>
    ); 
}
