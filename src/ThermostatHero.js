import React, { Component, createElement  } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import List from '@material-ui/core/List';
import TemperatureSensor from './thermostat/TemperatureSensor';

const useStyles = makeStyles({
        
    list: {
        width: '100%',
    },
    
});

function ThermostatHero(props) {
    
    const classes = useStyles();
    const device = props.deviceByName(props.Primary)
        
    return (
        !device ? null :
        <TemperatureSensor onClick={ () => props.setLayoutCard('ThermostatLayout') } key={ device.endpointId } name={ device.friendlyName } device={ device } 
                    deviceProperties={ props.deviceProperties[device.friendlyName] } wide={props.wide } />
    );
}

export default withData(ThermostatHero);
