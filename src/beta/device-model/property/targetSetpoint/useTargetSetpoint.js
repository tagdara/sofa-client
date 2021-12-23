import { useRegister } from 'store/useRegister'
import { directive } from 'store/directive'

const useTargetSetpoint = endpointId => {

    const { device, deviceState } = useRegister(endpointId)
    const targetSetpoint = deviceState ? deviceState.ThermostatController.targetSetpoint.deepvalue : undefined

    const isDyson = device && device.manufacturerName === "Dyson"
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
        directive(endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": newSetpoint, "scale": "FAHRENHEIT"}} )
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


    const targetSetpointColor = tempColor(targetSetpoint)
    const dysonLabel = thermostatMode !== "HEAT" ? "--" : targetSetpoint+ "°"
    const targetSetpointLabel = isDyson ? dysonLabel : targetSetpoint + "°"

    return { device, targetSetpoint, targetSetpointColor, targetSetpointLabel, setTargetTemperature, increaseSetpoint, decreaseSetpoint }

}

export default useTargetSetpoint;
