import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import TemperatureSensor from './thermostat/TemperatureSensor';
import Thermostat from './thermostat/Thermostat';
import ScheduleIcon from '@material-ui/icons/Schedule';
import IconButton from '@material-ui/core/IconButton';

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

    function switchToHistory() {
        props.setBack('ThermostatLayout',{})
        props.setLayoutCard('ThermostatHistory', {})
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Thermostats"} >
                <IconButton onClick={ () => switchToHistory() } className={classes.button }>
                    <ScheduleIcon fontSize="small" />
                </IconButton>            
            </GridBreak>

            { thermostats.map((device) =>
                <Thermostat sendAlexaCommand={props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } 
                                    device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] } />
            )}
            <GridBreak label={"Temperatures"} />
            { temperatureSensors.map((device) =>
                <TemperatureSensor key={ device.endpointId } name={ device.friendlyName } device={ device } 
                             deviceProperties={ props.deviceProperties[device.friendlyName] }  />
            )}
        </React.Fragment>
    )

};

export default withData(ThermostatLayout);