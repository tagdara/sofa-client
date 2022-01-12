import { useRegister } from 'store/useRegister'

const useConnectivity = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const selections = [{ label: "OK", value: "OK"}, { label: "Unreachable", value: "UNREACHABLE"}]
    const stateConnectivity = deviceState && deviceState.EndpointHealth.connectivity ? deviceState.EndpointHealth.connectivity.value : null
    const connectivity = value !== undefined ? value : stateConnectivity

    const setConnectivity = value => {
        // Can't set connectivity on a real object but this is used in the
        // activity editor to set triggers and conditions
        directive(endpointId, 'EndpointHealth', "SetConnectivity", { connectivity: value } )
    }
    
    const connectivityLabel = connectivity === "UNREACHABLE" ? "Unreachable" : "OK"
    const connectivityBool = connectivity ===  "OK"


    return { connectivity, connectivityBool, connectivityLabel, setConnectivity, selections }

}

export default useConnectivity
