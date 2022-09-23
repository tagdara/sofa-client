import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'

const useTargetSetpoint = ( endpointId, value, directive) => {

    const controller = "Alexa.ThermostatController"
    const { device, deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateTargetSetpoint = deviceState?.[controller]?.targetSetpoint?.value?.value 
    const targetSetpoint = value?.targetSetpoint?.value !== undefined ? value.targetSetpoint.value : stateTargetSetpoint
    const thermostatMode = deviceState?.[controller]?.thermostatMode?.value

    // Dyson devices are weird and this is a temporary shim while we make it better
    const isDyson = value === undefined && device && device.manufacturerName === "Dyson"


    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setTargetTemperature(stateTargetSetpoint)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const tempColor = ( temp ) => {

        if (isDyson && thermostatMode !== "HEAT") {
            return 'gray'
        }

        switch (true) {
            case (!temp):
                return 'gray'
            case (temp < 70): 
                return 'teal'
            case (temp < 75): 
                return 'green'
            case (temp < 90): 
                return 'orange'
            case (temp < 200): 
                return 'red'
            default:
                return 'gray'
        }
    }
    
    const setTargetTemperature = newSetpoint => {
        activeDirective(endpointId, controller, "SetTargetTemperature", { "targetSetpoint": { "value": newSetpoint, "scale": "FAHRENHEIT"}} )
    }

    const increaseSetpoint = amount => {
        // These have alexa equivalents that should be implemented properly
        const newSetpoint = targetSetpoint + amount
        setTargetTemperature(newSetpoint)
    }

    const decreaseSetpoint = amount => {
        // These have alexa equivalents that should be implemented properly
        const newSetpoint = targetSetpoint - amount
        setTargetTemperature(newSetpoint)
    }

    //function supportedRange() {
        //needs to be applied to the button version but stubbed for now
    //    try {
    //        return getController(props.device.endpointId, "ThermostatController").configuration.supportedRange
    //    }
    //    catch {}
    //    
    //    return [60,90]
    //}
    
    const targetSetpointColor = tempColor(targetSetpoint)
    const dysonLabel = thermostatMode !== "HEAT" ? "--" : targetSetpoint+ "°"
    const targetSetpointLabel = isDyson ? dysonLabel : targetSetpoint + "°"

    return { device, targetSetpoint, targetSetpointColor, targetSetpointLabel, setTargetTemperature, increaseSetpoint, decreaseSetpoint }

}

export default useTargetSetpoint;
