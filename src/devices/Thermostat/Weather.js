import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';

import CardBase from 'components/CardBase'
import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';
import ToggleAvatar from 'components/ToggleAvatar';

import useDeviceStateStore from 'store/deviceStateStore'
import { getModes, endpointIdByFriendlyName, register, unregister, modeDisplayName } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {        
        aqline: {
            display: "flex",
            justifyContent: "space-between",
        },
    }
});

export default function Weather(props) { 

    const classes = useStyles();
    const currentDevice = endpointIdByFriendlyName(props.current)
    const currentDeviceState = useDeviceStateStore( state => state.deviceStates[currentDevice] )
    const forecastDevice = endpointIdByFriendlyName(props.forecast)
    const forecastDeviceState = useDeviceStateStore( state => state.deviceStates[forecastDevice] )

    const indoorAQ = endpointIdByFriendlyName(props.indoorAirQuality)
    const indoorAQState = useDeviceStateStore( state => state.deviceStates[indoorAQ] )

    const outdoorAQ = endpointIdByFriendlyName(props.outdoorAirQuality)
    const outdoorAQState = useDeviceStateStore( state => state.deviceStates[outdoorAQ] )
    const deviceList = [currentDevice, forecastDevice, indoorAQ, outdoorAQ]

    useEffect(() => {
        register(deviceList, 'Weather')
        return function cleanup() {
            unregister(deviceList, 'Weather');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!currentDeviceState ) {
        return <><PlaceholderCard /><PlaceholderCard count={2}/></>
    }

    function tempColor(temp) {
        if (!temp) { return 'disabled' }
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function conLabel() {
        try {
            var modes=getModes(forecastDevice)
            return modes['Weather Condition'][forecastDeviceState['Weather Condition'].mode.value]
        }
        catch {}
        return "Forecast"
        
    }
    
    function indoorAQValueName() {
        try {
            return modeDisplayName(indoorAQ, 'Thermostat.Air Quality',indoorAQState['Air Quality'].mode.value)
        }
        catch {
            console.log(indoorAQState)
            //return props.indoorDeviceState['Air Quality'].mode.value
        }
    }

    function outdoorAQValueName() {
        try {
            return modeDisplayName(outdoorAQ, 'Other.Air Quality',outdoorAQState['Air Quality'].mode.value)
        }
        catch {
            console.log(outdoorAQ, outdoorAQState)
            //return props.outdoorDeviceState['Air Quality'].mode.value
        }
    }
 
    function outdoorAQI() {
        try {
            return outdoorAQState['AQI'].rangeValue.value
        }
        catch {
            console.log( outdoorAQState)
            //return props.outdoorDeviceState['Air Quality'].mode.value
        }
        return 0
    }
  
    
    return (
        
        <CardBase >
            <SofaListItem   avatar={currentDeviceState.TemperatureSensor.temperature.value ? currentDeviceState.TemperatureSensor.temperature.deepvalue : '--'} 
                            onClick={props.onClick} 
                            avatarState={ tempColor(currentDeviceState.TemperatureSensor.temperature.deepvalue) }
                            primary={ conLabel() } secondaryActions={
                                
                            <ToggleAvatar reverse={true} wideAvatar={true} small={true} avatarState={ tempColor(forecastDeviceState['Forecast High'].rangeValue.value) } >
                                {!forecastDeviceState['Forecast High'].rangeValue.value ? '--' :
                                        forecastDeviceState['Forecast Low'].rangeValue.value + ' - '+forecastDeviceState['Forecast High'].rangeValue.value } 
                            </ToggleAvatar>
                            }/>
            <ListItem className={classes.aqline} >
                            <ToggleAvatar small={true}  wideAvatar={true} avatarState={ indoorAQValueName() } >
                                { indoorAQValueName() + " Indoor AQ" }
                            </ToggleAvatar>
                            <ToggleAvatar reverse={true} small={true}  wideAvatar={true} avatarState={ outdoorAQValueName() } >
                                { "AQI "+outdoorAQI() }
                            </ToggleAvatar>
            </ListItem>

        </CardBase>
    );
}


