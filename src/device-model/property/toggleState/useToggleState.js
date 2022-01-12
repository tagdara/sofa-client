import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { camelCase, isReachable } from 'store/deviceHelpers';

const useToggleState = ( endpointId, userInstance, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const instance = userInstance.includes('.') ? userInstance.split('.')[1] : userInstance
    const activeDirective = directive ? directive : storeDirective
    const stateToggleState = deviceState && deviceState.hasOwnProperty(instance) ? deviceState[instance].toggleState.value : undefined
    const toggleState = value !== undefined ? value : stateToggleState
    const reachable = value !== undefined ? true : isReachable(deviceState)
    const selections =[{ label: "On", value: "ON"}, { label: "Off", value: "OFF"}]

    const selectToggleState = newState => {
        // Used for activity editor mostly - not a real alexa directive
        if (newState.toLowerCase()  === "on") {
            turnOn()
        } else if (newState.toLowerCase()  === "off") {
            turnOff()
        }
    }

    const turnOn = () => {
        activeDirective(endpointId, instance, "TurnOn")
    }

    const turnOff = () => {
        activeDirective(endpointId, instance, "TurnOff")
    }   

    const toggleStateLabel = toggleState !== undefined ? camelCase(toggleState) : ""
    const toggleStateBool = toggleState === "ON"

    const toggle = () => {
        toggleStateBool ? turnOff() : turnOn()
    }


    // set default in activity editor
    if (directive && value === undefined) {
        selectToggleState(stateToggleState)
    }

    return { toggleState, toggleStateBool, toggleStateLabel, turnOn, turnOff, toggle, selectToggleState, selections, reachable }
}

export default useToggleState
