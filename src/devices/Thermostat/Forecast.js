import React, { useEffect } from 'react';
import { register, unregister, getModes, endpointIdByFriendlyName } from 'store/deviceHelpers'
import ItemBase from 'components/ItemBase'
import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'

export default function Forecast(props) { 
    
    const device = endpointIdByFriendlyName(props.Primary)
    const deviceState = useDeviceStateStore( state => state.deviceStates[props.Primary] )

    useEffect(() => {
        register(props.Primary, "Forecast"+props.Primary)
        return function cleanup() {
            unregister(props.Primary, "Forecast"+props.Primary)
        };
    // eslint-disable-next-line 
    }, [props.Primary])


    if (!deviceState) {
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
            return modes['Weather Condition'][deviceState['Weather Condition'].mode.value]
        }
        catch {}
        return "Forecast"
        
    }

    conLabel()
    
    return (
        <ItemBase >
            <SofaListItem   avatar={!deviceState['Forecast High'].rangeValue.value ? '--' :
                                        deviceState['Forecast Low'].rangeValue.value + ' - '+deviceState['Forecast High'].rangeValue.value } 
                            avatarState={ tempColor(deviceState['Forecast High'].rangeValue.value) }
                            primary={ conLabel() } wideAvatar={true}/>
        </ItemBase>
    );
}

