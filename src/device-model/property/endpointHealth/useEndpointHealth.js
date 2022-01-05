import { useRegister } from 'store/useRegister'

const useEndpointHealth = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const stateConnectivity = deviceState && deviceState.EndpointHealth ? deviceState.EndpointHealth.connectivity.value.value : 'OK'
    const userValue = value && value.connectivity && value.connectivity.value && value.connectivity.value.value ? value.connectivity.value.value : undefined
    const connectivity = userValue ? userValue : stateConnectivity

    // Only used for activity editor changes since connectivity is non controllable
    const setConnectivity = newValue => {
        if (directive) {
            directive(endpointId, "PowerController", "SetConnectivity", {"connectivity": { "value": newValue }} )
        }
    }   

    const connectivityLabel = connectivity === "OK" ? "OK" : "Unreachable"
    const connectivityBool = connectivity === 'OK'
    const reachable = connectivityBool // Convenience mapping for some existing items

    return { connectivity, connectivityBool, connectivityLabel, setConnectivity, reachable }

}

export default useEndpointHealth
