import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'
import { useEffect } from 'react'
import { camelCase, isReachable } from 'store/deviceHelpers';

const useToggleState = ( endpointId, instance, value, directive) => {

    // Mode is an instanced controller and the endpointState is stored by instance name

    // const controller = "Alexa.ToggleController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateToggleState = deviceState?.[instance]?.toggleState?.value
    const toggleState = value !== undefined ? value : stateToggleState
    const reachable = value !== undefined ? true : isReachable(deviceState)
    const selections =[{ label: "On", value: "ON"}, { label: "Off", value: "OFF"}]

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            selectToggleState(stateToggleState)
        }
    // eslint-disable-next-line 
    }, [  ]);

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

    return { toggleState, toggleStateBool, toggleStateLabel, turnOn, turnOff, toggle, selectToggleState, selections, reachable }
}

export default useToggleState
