import React, { useEffect } from 'react';
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineSelect from 'components/CardLineSelect'

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { register, unregister, isModeNonControllable, getModeControllerFriendlyName, getSupportedModeList} from 'store/deviceHelpers'

export default function ModeLine(props) {

    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'modeline-'+props.endpointId+"."+props.instance)
        return function cleanup() {
            unregister(props.endpointId, 'modeline-'+props.endpointId+"."+props.instance)
        };
    // eslint-disable-next-line 
    }, [ props.endpointId ] )


    const name = getModeControllerFriendlyName(props.endpointId, props.instance)
    const selections = getSupportedModeList(props.endpointId, props.instance)
    const nonControllable = isModeNonControllable(props.endpointId, props.instance)
    const modeState = deviceState[props.instance].mode.value

    const disabled = props.disabled || nonControllable
    
    function handleSelect(choice) {
        directive(props.endpointId, props.instance, 'SetMode', { "mode": choice })
    }; 

    if (!deviceState) { return null }
    
    return (
        <CardLine>
            <CardLineText primary={ name } />
            <CardLineSelect disabled={ disabled } 
                            value={ modeState } 
                            select={ handleSelect}
                            selections={ selections }
            />
        </CardLine>
    )
}