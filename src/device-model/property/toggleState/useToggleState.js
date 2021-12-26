import { useRegister } from 'store/useRegister'
import { directive } from 'store/directive'

const useToggleState = (endpointId, instance) => {

    const { deviceState } = useRegister(endpointId)
    const toggleState = deviceState && deviceState.hasOwnProperty(instance) ? deviceState[instance].toggleState.value : undefined

    const turnOn = () => {
        directive(endpointId, instance, "TurnOn")
    }

    const turnOff = () => {
        directive(endpointId, instance, "TurnOff")
    }   

    const toggleStateLabel = toggleState === "ON" ? "On" : "Off"
    const toggleStateBool = toggleState === "ON"

    return { toggleState, toggleStateBool, toggleStateLabel, turnOn, turnOff }

}

export default useToggleState
