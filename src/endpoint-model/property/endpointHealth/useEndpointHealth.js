import { useEffect } from 'react'
import { useRegister } from 'endpoint-model/register/useRegister'

const useEndpointHealth = (endpointId, value, directive) => {

    const controller = "Alexa.EndpointHealth"
    const { deviceState } = useRegister(endpointId)
    const stateConnectivity = deviceState?.[controller]?.connectivity?.value?.value || 'UNREACHABLE'
    const userValue = value?.connectivity?.value?.value
    const connectivity = userValue || stateConnectivity

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setConnectivity(stateConnectivity)
        }
    // eslint-disable-next-line 
    }, [  ]);

    // Only used for activity editor changes since connectivity is non controllable
    const setConnectivity = newValue => {
        if (directive) {
            directive(endpointId, controller, "SetConnectivity", {"connectivity": { "value": newValue }} )
        }
    }   

    const connectivityLabel = connectivity === "OK" ? "OK" : "Unreachable"
    const connectivityBool = connectivity === 'OK'
    const reachable = connectivityBool // Convenience mapping for some existing items

    return { connectivity, connectivityBool, connectivityLabel, setConnectivity, reachable }

}

export default useEndpointHealth
