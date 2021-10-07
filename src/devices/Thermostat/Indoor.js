import React, { useContext, useState, useEffect }from 'react';
import { DeviceStateContext } from 'context/DeviceStateContext';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/styles';

import CardBase from 'components/CardBase'
import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';
import ToggleAvatar from 'components/ToggleAvatar';

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
    const { getModes, cardReady, devices, deviceState, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices, modeDisplayName } = useContext(DeviceStateContext);
    const [ currentDevice, setCurrentDevice ]=useState(undefined)
    const [ forecastDevice, setForecastDevice ]=useState(undefined)
    const [ indoorAQ, setIndoorAQ ]=useState(undefined)
    const [ outdoorAQ, setOutdoorAQ ]=useState(undefined)

    useEffect(() => {
        setCurrentDevice(getEndpointIdsByFriendlyName(props.current, 'Weather')[0])
        setForecastDevice(getEndpointIdsByFriendlyName(props.forecast, 'Weather')[0])
        setIndoorAQ(getEndpointIdsByFriendlyName(props.indoorAirQuality, 'Weather'))
        setOutdoorAQ(getEndpointIdsByFriendlyName(props.outdoorAirQuality, 'Weather'))

        return function cleanup() {
            unregisterDevices('Weather');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!cardReady('Weather')) {
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
            return modes['Weather Condition'][deviceStates[forecastDevice]['Weather Condition'].mode.value]
        }
        catch {}
        return "Forecast"
        
    }
    
    function indoorAQValueName() {
        try {
            return modeDisplayName(devices[indoorAQ], 'Thermostat.Air Quality',deviceState(indoorAQ)['Air Quality'].mode.value)
        }
        catch {
            console.log(deviceState(indoorAQ))
            //return props.indoorDeviceState['Air Quality'].mode.value
        }
    }

    function outdoorAQValueName() {
        try {
            return modeDisplayName(devices[outdoorAQ], 'Other.Air Quality',deviceState(outdoorAQ)['Air Quality'].mode.value)
        }
        catch {
            console.log(outdoorAQ, deviceState(outdoorAQ))
            //return props.outdoorDeviceState['Air Quality'].mode.value
        }
    }
 
    function outdoorAQI() {
        try {
            return deviceState(outdoorAQ)['AQI'].rangeValue.value
        }
        catch {
            console.log( props.outdoorDeviceState)
            //return props.outdoorDeviceState['Air Quality'].mode.value
        }
        return 0
    }
  
    
    return (
        
        <CardBase >
            <SofaListItem   avatar={deviceStates[currentDevice].TemperatureSensor.temperature.value ? deviceStates[currentDevice].TemperatureSensor.temperature.deepvalue : '--'} 
                            onClick={props.onClick} 
                            avatarState={ tempColor(deviceStates[currentDevice].TemperatureSensor.temperature.deepvalue) }
                            primary={ conLabel() } secondaryActions={
                                
                            <ToggleAvatar reverse={true} wideAvatar={true} small={true} avatarState={ tempColor(deviceStates[forecastDevice]['Forecast High'].rangeValue.value) } >
                                {!deviceStates[forecastDevice]['Forecast High'].rangeValue.value ? '--' :
                                        deviceStates[forecastDevice]['Forecast Low'].rangeValue.value + ' - '+deviceStates[forecastDevice]['Forecast High'].rangeValue.value } 
                            </ToggleAvatar>
                            }/>
            <ListItem className={classes.aqline} >
                            <ToggleAvatar small={true}  wideAvatar={true} avatarState={ indoorAQValueName() } >
                                { indoorAQValueName() + " Indoor AQ" }
                            </ToggleAvatar>
                            <ToggleAvatar reverse={true} small={true}  wideAvatar={true} avatarState={ outdoorAQValueName() } >
                                { outdoorAQValueName() + " Outdoor AQI ("+outdoorAQI()+")"  }
                            </ToggleAvatar>
            </ListItem>

        </CardBase>
    );
}


