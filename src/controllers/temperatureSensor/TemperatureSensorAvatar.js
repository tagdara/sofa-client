import React, { useEffect }from 'react';
import ToggleAvatar from 'components/ToggleAvatar';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
 
const TemperatureSensorAvatar = props => {
    
    const deviceState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'TemperatureSensorAvatar-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'TemperatureSensorAvatar-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, []) 

    if (!deviceState) { return null }

    const temperature = deviceState.TemperatureSensor.temperature.value.value

    function tempColor(temp) {
        if (!temp) { return 'disabled' }
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }

    return (
        <ToggleAvatar reverse={props.reverse} wideAvatar={false} small={props.small} avatarState={ tempColor(temperature) } >
            { temperature }
        </ToggleAvatar>
    );
}

export default TemperatureSensorAvatar;
