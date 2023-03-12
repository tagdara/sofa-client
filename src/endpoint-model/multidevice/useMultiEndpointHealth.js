import { useMemo } from 'react';
import { useMultiRegister } from 'endpoint-model/register/useRegister'
import { hasCapability } from 'endpoint-model/discovery'

const useMultiEndpointHealth = (endpointIds) => {
    const controller = "Alexa.EndpointHealth"
    const endpointHealthDevices = useMemo( () => { return endpointIds.filter(endpointId => hasCapability(endpointId, controller)) }, [endpointIds])
    const { deviceStates } = useMultiRegister(endpointHealthDevices)
    const onlineCount = deviceStates ? Object.keys(deviceStates).filter(endpointId => deviceStates[endpointId]?.[controller]?.connectivity?.value?.value === "OK").length : 0

    return { onlineCount }

}

export default useMultiEndpointHealth

