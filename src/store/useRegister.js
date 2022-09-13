
import { useEffect, useState } from 'react'
import { useId } from '@mantine/hooks';
import useRegisterStore from 'store/registerStore'
import useDeviceStateStore from 'store/deviceStateStore'
import { deviceByEndpointId, compareState } from 'store/deviceHelpers'

export const useMultiRegister = (endpointIds) => {

    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)
    const [ registeredDevices, setRegisteredDevices ] = useState([])
    const deviceStates = useDeviceStateStore(state => Object.fromEntries(
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
    const deviceState = useDeviceStateStore( state => state.deviceStates[endpointId] )
    const device = deviceByEndpointId(endpointId)   
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
