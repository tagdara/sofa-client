import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'
import { camelCase } from 'helpers/camelCase'
import { isReachable } from 'endpoint-model/state'

const usePowerState = (endpointId, value, directive) => {

    const controller = "Alexa.PowerController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const statePowerState = deviceState?.[controller]?.powerState?.value
    const powerState = value?.powerState !== undefined ? value.powerState : statePowerState
    const reachable = value !== undefined ? true : isReachable(deviceState)
    const selections =[{ label: "On", value: "ON"}, { label: "Off", value: "OFF"}]

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            selectPowerState(statePowerState)
        }
    // eslint-disable-next-line 
    }, [  ]);


    const selectPowerState = newState => {
        // Used for activity editor mostly - not a real alexa directive
        if (newState.toLowerCase()  === "on") {
            turnOn()
        } else if (newState.toLowerCase()  === "off") {
            turnOff()
        }
    }

    const turnOn = () => {
        activeDirective(endpointId, controller, "TurnOn")
    }

    const turnOff = () => {
        activeDirective(endpointId, controller, "TurnOff")
    }   

    const powerStateLabel = powerState ? camelCase(powerState) : ""
    const powerStateBool = powerState === "ON"

    const toggle = () => {
        powerStateBool ? turnOff() : turnOn()
    }

    return { powerState, powerStateBool, powerStateLabel, turnOn, turnOff, toggle, selectPowerState, selections, reachable }

}

export default usePowerState
