import React, { useState } from 'react';

import Thermostat from 'devices/Thermostat/Thermostat';
import AirQualityBadge from 'endpoint-model/instance/AirQualityBadge'

import StackCard from 'layout/components/StackCard'
import ThermostatList from 'devices/Thermostat/ThermostatList'
import ThermostatPullUp from 'devices/Thermostat/ThermostatPullUp'
import { Collapse, Stack } from '@mantine/core';
import usePullUp from 'layout/pullup/usePullUp'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

const ThermostatCard = props => {

    const [ expanded, setExpanded ] = useState(false)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { pullUpActive, showPullUp } = usePullUp(name)

    // onClick={ () => setExpanded(!expanded) } 
    return (
        <>
            <StackCard onClick={ () => setExpanded(!expanded) }>
                <Stack style={{ width: "100%"}}>
                    <Thermostat endpointId={props.endpointId} 
                            onClick={showPullUp  } 
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
            <ThermostatPullUp opened={pullUpActive} endpointId={props.endpointId} />
        </>
    ); 
}

export default ThermostatCard;