import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const usePowerState = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const statePowerState = deviceState && deviceState.PowerController ? deviceState.PowerController.powerState.value : undefined
    const userValue = value && value.powerState && value.powerState.value ? value.powerState.value : undefined
    const powerState = userValue ? userValue : statePowerState

    const turnOn = () => {
        activeDirective(endpointId, "PowerController", "TurnOn")
    }

    const turnOff = () => {
        activeDirective(endpointId, "PowerController", "TurnOff")
    }   

    const powerStateLabel = powerState === "ON" ? "On" : "Off"
    const powerStateBool = powerState === "ON"

    return { powerState, powerStateBool, powerStateLabel, turnOn, turnOff }

}

export default usePowerState