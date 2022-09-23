
import { useEffect, useState } from 'react'
import { useId } from '@mantine/hooks';
import useRegisterStore from 'endpoint-model/register/registerStore'
import useEndpointStateStore from 'endpoint-model/state/endpointStateStore'
import { endpointByEndpointId } from 'endpoint-model/discovery'

// In order to prevent network spam to endpoint devices, we track which endpoints are currently visibile or required
// and only receive updates for those endpoints.  The individual use[ Controller / Property ] hooks include the registration
// and all other app components should rely on those mechanisms rather than registering directly

// There are separate registration hooks for multiple devices and solo devices due to the added complexity and overhead
// of 'overselecting' too many devices and causing network traffic and unneeded renders

export const compareState = (oldData, newData) => {
    for (var item in oldData) {
        if (!oldData[item].hasOwnProperty('last_update')) { console.log('state no last update', oldData[item])}
        if ((oldData[item].last_update !== newData[item].last_update)) { 
            //console.log(item, 'last update mismatch', oldData[item].last_update, newData[item].last_update )
            return false
        }
    }
    for (var dataItem in newData) {
        if (!oldData[dataItem]) {
            //console.log('missing state mismatch')
            return false
        }
    }    
    return true
}

export const useMultiRegister = (endpointIds) => {

    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)
    const [ registeredDevices, setRegisteredDevices ] = useState([])
    const deviceStates = useEndpointStateStore(state => Object.fromEntries(
                registeredDevices.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), 
                        (oldState, newState) => compareState(oldState, newState))

    const uuid = useId();

    useEffect(() => {
        register(endpointIds, uuid)
        setRegisteredDevices(endpointIds)
        return function cleanup() {
            unregister(endpointIds, uuid)
        };
    // eslint-disable-next-line 
    }, [  ])
  
    return { deviceStates, registeredDevices }
}

export const useRegister = endpointId => {

    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)
    const [ registeredDevice, setRegisteredDevice ] = useState(undefined)
    const deviceState = useEndpointStateStore(state => state.deviceStates[endpointId] )
    const device = endpointByEndpointId(endpointId)   
    const connected = deviceState?.EndpointHealth?.connectivity?.value?.value === 'OK'
    const uuid = useId();

    useEffect(() => {
        if (endpointId) {
            register(endpointId, uuid)
            setRegisteredDevice(endpointId)
        }
        return function cleanup() {
            if (endpointId) {
                unregister(endpointId, uuid)
            }
        };
    // eslint-disable-next-line 
    }, [ endpointId ])
  
    return { device, deviceState, connected, registeredDevice }
}
