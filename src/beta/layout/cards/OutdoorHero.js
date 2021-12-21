import React, { useState } from 'react';
import StackCard from 'beta/components/StackCard'
import Weather from 'beta/devices/Weather/Weather';
import WeatherList from 'beta/devices/Weather/WeatherList'
import { Collapse, Group } from '@mantine/core';
import { endpointIdByFriendlyName } from 'store/deviceHelpers'

export default function OutdoorHero(props) {
    
    const [ expanded, setExpanded ] = useState(false)
    const currentDevice = endpointIdByFriendlyName(props.outdoor)

    return (
        <StackCard>
            <Group direction="column" noWrap style={{ width: "100%"}}>
                <Weather    aq={props.outdoorAirQuality} 
                            current={props.outdoor} 
                            forecast={"Rainmachine"} 
                            onClick={ () => setExpanded(!expanded) }
                />  
                <Collapse in={expanded} style={{width: "100%"}}>
                    <WeatherList endpointId={currentDevice} />
                </Collapse>
            </Group>
        </StackCard>
    ); 
}
