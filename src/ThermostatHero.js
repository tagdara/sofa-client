import React from 'react';

import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import List from '@material-ui/core/List';
import TemperatureSensor from './thermostat/TemperatureSensor';

function ThermostatHero(props) {
    
    const device = props.deviceByFriendlyName(props.Primary)
        
    return (
        !device ? null :
        <TemperatureSensor onClick={ () => props.applyLayoutCard('ThermostatLayout') } key={ device.endpointId } device={ device } wide={props.wide } />
    );
}

export default withData(withLayout(ThermostatHero));
