import React, { useState } from 'react';

import Thermostat from 'beta/devices/Thermostat/Thermostat';
import AirQualityBadge from 'beta/device-model/instance/AirQualityBadge'
import PlaceholderCard from 'beta/layout/PlaceholderCard';

import { endpointIdByFriendlyName } from 'store/deviceHelpers'
import StackCard from 'beta/components/StackCard'
import ThermostatList from 'beta/devices/Thermostat/ThermostatList'
import { Collapse, Group } from '@mantine/core';

const ThermostatHero = props => {
    const endpointId =  endpointIdByFriendlyName(props.primary)
    const indoorAQ = endpointIdByFriendlyName(props.indoorAirQuality)  
    const [ expanded, setExpanded ] = useState(false)

    if (!endpointId) {
        return <PlaceholderCard count={2}/>
    }

    return (
        <StackCard>
            <Group direction="column" style={{ width: "100%"}}>
                <Thermostat endpointId={endpointId} 
                        onClick={ () => setExpanded(!expanded) } 
                        wide={props.wide } 
                >
                    <AirQualityBadge size="md" endpointId={indoorAQ} instance={"Air Quality"} suffix={"Indoor AQ"} />
                </Thermostat>
                <Collapse in={expanded} style={{ width: "100%"}}>
                    <ThermostatList />
                </Collapse>
            </Group>
        </StackCard>
    ); 
}

export default ThermostatHero;