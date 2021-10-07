import React, { useContext } from 'react';

import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceStateContext } from 'context/DeviceStateContext';

import SofaListItem from 'components/SofaListItem';
import CardBase from 'components/CardBase'
import ToggleAvatar from 'components/ToggleAvatar'


export default function AirQuality(props) { 
    
    const { selectPage } = useContext(LayoutContext);
    const { modeDisplayName } = useContext(DeviceStateContext);
    
    function indoorAQValueName() {
        try {
            return modeDisplayName(props.indoorDevice,'Thermostat.Air Quality',props.indoorDeviceState['Air Quality'].mode.value)
        }
        catch {
            return props.indoorDeviceState['Air Quality'].mode.value
        }
    }

    function outdoorAQValueName() {
        try {
            return modeDisplayName(props.outdoorDevice,'Other.Air Quality',props.outdoorDeviceState['Air Quality'].mode.value)
        }
        catch {
            console.log(props.outdoorDeviceState)
            //return props.outdoorDeviceState['Air Quality'].mode.value
        }
    }

    return (
        
        <CardBase >
            <SofaListItem   avatar={ outdoorAQValueName() + " Outdoor AQI ("+props.outdoorDeviceState['AQI'].range.value+")" } onClick={() => selectPage('ThermostatLayout')} avatarState={ outdoorAQValueName() }
                            primary={' '} wideAvatar={true} smallAvatar={true}
                            
                            secondaryActions={
                                <ToggleAvatar small={true}  wideAvatar={true} avatarState={ indoorAQValueName() } onClick={() => selectPage('ThermostatLayout')} >
                                    { indoorAQValueName() + " Indoor AQ" }
                                </ToggleAvatar>
                            } />
        </CardBase>
    );
}

