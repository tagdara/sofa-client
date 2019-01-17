import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import Thermostat from './thermostat/thermostat';
import ThermostatSettable from './thermostat/thermostatSettable';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

function ThermostatLayout(props) {

    const classes = useStyles();
    const [filter, setFilter] = useState('all');
    const isMobile = window.innerWidth <= 800;
    const [changeTimes, setChangeTimes] = useState({})
    const thermostats=props.devicesByCategory('THERMOSTAT')
    const temperatureSensors=props.devicesByCategory('TEMPERATURE_SENSOR')


    return (    
        <React.Fragment>
            <GridBreak label={"Thermostats"} />

            { thermostats.map((device) =>
                <ThermostatSettable sendAlexaCommand={props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } 
                                    device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] } />
            )}
            <GridBreak label={"Temperatures"} />
            { temperatureSensors.map((device) =>
                <Thermostat key={ device.endpointId } name={ device.friendlyName } device={ device } 
                             deviceProperties={ props.deviceProperties[device.friendlyName] }  />
            )}
        </React.Fragment>
    )

};

export default withData(ThermostatLayout);