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

    function isSettable(device) {
        
        for (var j = 0; j < device.capabilities.length; j++) {
            if (device.capabilities[j].interface=="Alexa.ThermostatController") {
                return true
            }
        }
        return false;
    }; 
    
    function filterBySettable(settable) {
        var filtered=[]
        var all=props.devicesByCategory('THERMOSTAT')
        
        for (var j = 0; j < all.length; j++) {
            if (isSettable(all[j])==settable) {
                filtered.push(all[j])
            }
        }

        return filtered
            
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Thermostats"} />

            { filterBySettable(true).map((device) =>
                <ThermostatSettable sendAlexaCommand={props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } 
                                    device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] } />
            )}
            <GridBreak label={"Temperatures"} />
            { filterBySettable(false).map((device) =>
                <Thermostat key={ device.endpointId } name={ device.friendlyName } device={ device } 
                             deviceProperties={ props.deviceProperties[device.friendlyName] }  />
            )}
        </React.Fragment>
    )

};

export default withData(ThermostatLayout);