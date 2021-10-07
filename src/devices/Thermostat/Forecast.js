import React, { useContext, useState, useEffect }from 'react';
import { DeviceStateContext } from 'context/DeviceStateContext';

import CardBase from 'components/CardBase'
import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';

export default function Forecast(props) { 
    
    const { getModes, cardReady, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DeviceStateContext);
    const [ device, setDevice ]=useState(undefined)

    useEffect(() => {
        setDevice(getEndpointIdsByFriendlyName(props.Primary, 'Forecast')[0])
        return function cleanup() {
            unregisterDevices('Forecast');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    if (!cardReady('Forecast')) {
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
            var modes=getModes(device)
            return modes['Weather Condition'][deviceStates[device]['Weather Condition'].mode.value]
        }
        catch {}
        return "Forecast"
        
    }

    conLabel()
    
    return (
        
        <CardBase >
            <SofaListItem   avatar={!deviceStates[device]['Forecast High'].rangeValue.value ? '--' :
                                        deviceStates[device]['Forecast Low'].rangeValue.value + ' - '+deviceStates[device]['Forecast High'].rangeValue.value } 
                            avatarState={ tempColor(deviceStates[device]['Forecast High'].rangeValue.value) }
                            primary={ conLabel() } wideAvatar={true}/>
        </CardBase>
    );
}

