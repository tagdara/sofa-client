import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GridItem from './GridItem';
import GridSection from './GridSection';
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

    return (    
        <React.Fragment>
            <GridSection name={"Thermostats"}>
                { thermostats.map((device) =>
                    <Thermostat sendAlexaCommand={props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } 
                                        device={ device } deviceProperties={ props.deviceProperties[device.endpointId] } />
                )}
            </GridSection>
            
            <GridSection name={"Temperatures"}>
            { temperatureSensors.map((device) =>
                <TemperatureSensor key={ device.endpointId } name={ device.friendlyName } device={ device } 
                             deviceProperties={ props.deviceProperties[device.endpointId] }  />
            )}
            </GridSection>
        </React.Fragment>
    )

};

export default withData(withLayout(ThermostatLayout));