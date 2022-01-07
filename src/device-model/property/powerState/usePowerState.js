import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { isReachable } from 'store/deviceHelpers'

const usePowerState = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const statePowerState = deviceState && deviceState.PowerController ? deviceState.PowerController.powerState.value : undefined
    const powerState = value !== undefined ? value : statePowerState
    const reachable = value !== undefined ? true : isReachable(deviceState)
    const selections =[{ label: "On", value: "ON"}, { label: "Off", value: "OFF"}]

    const selectPowerState = newState => {
        // Used for activity editor mostly - not a real alexa directive
        if (newState.toLowerCase()  === "on") {
            turnOn()
        } else if (newState.toLowerCase()  === "off") {
            turnOff()
        }
    }

    const turnOn = () => {
        activeDirective(endpointId, "PowerController", "TurnOn")
    }

    const turnOff = () => {
        activeDirective(endpointId, "PowerController", "TurnOff")
    }   

    const powerStateLabel = powerState === "ON" ? "On" : "Off"
    const powerStateBool = powerState === "ON"

    const toggle = () => {
        powerStateBool ? turnOff() : turnOn()
    }

    return { powerState, powerStateBool, powerStateLabel, turnOn, turnOff, toggle, selectPowerState, selections, reachable }

}

export default usePowerState
