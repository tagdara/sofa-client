import React, { useState } from 'react';

import Thermostat from 'devices/Thermostat/Thermostat';
import AirQualityBadge from 'endpoint-model/instance/AirQualityBadge'
import PlaceholderCard from 'layout/PlaceholderCard';

import StackCard from 'components/StackCard'
import ThermostatList from 'devices/Thermostat/ThermostatList'
import { Collapse, Stack } from '@mantine/core';

const ThermostatCard = props => {

    const [ expanded, setExpanded ] = useState(false)

    if (!props.endpointId) {
        return <PlaceholderCard count={2}/>
    }

    return (
        <StackCard>
            <Stack style={{ width: "100%"}}>
                <Thermostat endpointId={props.endpointId} 
                        onClick={ () => setExpanded(!expanded) } 
                        wide={props.wide } 
                >
                    <AirQualityBadge size="md" endpointId={props.airQuality} instance={"Air.Quality"} suffix={"Indoor AQ"} />
                </Thermostat>
                { props.expand &&
                    <Collapse in={expanded} style={{ width: "100%"}}>
                        <ThermostatList />
                    </Collapse>
                }
            </Stack>
        </StackCard>
    ); 
}

export default ThermostatCard;