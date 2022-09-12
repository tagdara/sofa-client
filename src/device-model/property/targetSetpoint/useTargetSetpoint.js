import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useTargetSetpoint = ( endpointId, value, directive) => {

    const { device, deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateTargetSetpoint = deviceState ? deviceState.ThermostatController.targetSetpoint.value.value : undefined
    const targetSetpoint = value !== undefined ? value.value : stateTargetSetpoint

    const isDyson = value === undefined && device && device.manufacturerName === "Dyson"
    const thermostatMode = deviceState ? deviceState.ThermostatController.thermostatMode.value : undefined

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
        activeDirective(endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": newSetpoint, "scale": "FAHRENHEIT"}} )
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

    // set default in activity editor
    if (directive && value === undefined) {
        setTargetTemperature(stateTargetSetpoint)
    }

    return { device, targetSetpoint, targetSetpointColor, targetSetpointLabel, setTargetTemperature, increaseSetpoint, decreaseSetpoint }

}

export default useTargetSetpoint;
