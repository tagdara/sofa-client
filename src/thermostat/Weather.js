import React, { useContext, useState, useEffect }from 'react';
import { DataContext } from '../DataContext/DataProvider';

import CardBase from '../CardBase'
import SofaListItem from '../SofaListItem';
import PlaceholderCard from '../PlaceholderCard';
import ToggleAvatar from '../ToggleAvatar';


export default function Weather(props) { 
    
    const { getModes, cardReady, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DataContext);
    const [ currentDevice, setCurrentDevice ]=useState(undefined)
    const [ forecastDevice, setForecastDevice ]=useState(undefined)

    useEffect(() => {
        setCurrentDevice(getEndpointIdsByFriendlyName(props.current, 'Weather')[0])
        setForecastDevice(getEndpointIdsByFriendlyName(props.forecast, 'Weather')[0])
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
        </CardBase>
    );
}


