import React, { useEffect }from 'react';
import Typography from '@material-ui/core/Typography';

import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'


const RangeValueText = props => {
    //const additionalAttributes = ['Light Level', 'Humidity', 'Wind Speed', 'UV Index', 'Rainfall']
    const deviceState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'RangeValueText-'+props.instance+"-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'RangeValueText-'+props.instance+"-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, []) 

    if (!deviceState || !deviceState.hasOwnProperty(props.instance)) { return null }

    return (
        <Typography>{ deviceState[props.instance].rangeValue.value }</Typography>
    );
}

export default RangeValueText;
