import React, { useEffect } from 'react';
import CardLineText from 'components/CardLineText'
import useDeviceStateStore from 'store/deviceStateStore'
import { modeDisplayName, register, unregister } from 'store/deviceHelpers'

export default function ModeControllerText(props) {

    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'ModeControllerText-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'ModeControllerText-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [ ] )

    if (!deviceState) { return null }

    const modeValue = deviceState[props.instance].mode.value
    const modeText = modeDisplayName(props.endpointId, props.instance, modeValue)

    return (
        <CardLineText   onClick={ props.onClick } 
                        primary={ modeText } 
                        secondary={ props.secondary } 
                    />
    );
}


