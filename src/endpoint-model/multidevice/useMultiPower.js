import { useMemo } from 'react';
import { useMultiRegister } from 'endpoint-model/register/useRegister'
import { hasCapability } from 'endpoint-model/discovery'

const useMultiPower = (endpointIds) => {
    const controller = "Alexa.PowerController"
    const powerDevices = useMemo( () => { return endpointIds.filter(endpointId => hasCapability(endpointId, controller)) }, [endpointIds])
    const { deviceStates } = useMultiRegister(powerDevices)
    const onCount = deviceStates ? Object.keys(deviceStates).filter(endpointId => deviceStates[endpointId]?.[controller]?.powerState?.value === "ON").length : 0

    return { onCount }

}

export default useMultiPower

