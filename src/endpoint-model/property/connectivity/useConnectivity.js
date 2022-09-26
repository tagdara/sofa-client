import { useEffect } from 'react'
import { useRegister } from 'endpoint-model/register/useRegister'

const useConnectivity = (endpointId, value, directive) => {

    const controller = "Alexa.EndpointHealth"
    const { deviceState } = useRegister(endpointId)
    const stateConnectivity = deviceState?.[controller]?.connectivity?.value?.value
    const connectivity = value?.connectivity || stateConnectivity

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setConnectivity(stateConnectivity)
        }
    // eslint-disable-next-line 
    }, [  ]);


    const setConnectivity = value => {
        // Can't set connectivity on a real object but this is used in the
        // activity editor to set triggers and conditions
        directive(endpointId, controller, "SetConnectivity", { connectivity: value } )
    }

    const connectivityLabel = connectivity === "UNREACHABLE" ? "Unreachable" : "OK"
    const connectivityBool = connectivity ===  "OK"
    const selections = [{ label: "OK", value: "OK"}, { label: "Unreachable", value: "UNREACHABLE"}]

    return { connectivity, connectivityBool, connectivityLabel, setConnectivity, selections }

}

export default useConnectivity
