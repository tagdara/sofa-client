import { useMemo } from 'react';
import { useMultiRegister } from 'store/useRegister'
import { hasCapability } from 'store/deviceHelpers'

const useMultiPower = (endpointIds) => {

    const powerDevices = useMemo( () => { return endpointIds.filter(endpointId => hasCapability(endpointId, "PowerController")) }, [endpointIds])
    const { deviceStates } = useMultiRegister(powerDevices)
    const onCount = deviceStates ? Object.keys(deviceStates).filter(endpointId => deviceStates[endpointId].PowerController?.powerState?.value === "ON").length : 0

    return { onCount }

}

export default useMultiPower
