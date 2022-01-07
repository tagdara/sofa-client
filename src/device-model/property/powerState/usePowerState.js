import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { isReachable } from 'store/deviceHelpers'

const usePowerState = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const statePowerState = deviceState && deviceState.PowerController ? deviceState.PowerController.powerState.value : undefined
    const userValue = value ? value : undefined
    const powerState = userValue ? userValue : statePowerState
    const reachable = userValue ? true : isReachable(deviceState)

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

    return { powerState, powerStateBool, powerStateLabel, turnOn, turnOff, toggle, reachable }

}

export default usePowerState
