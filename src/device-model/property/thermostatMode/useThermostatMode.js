import { camelCase, getController } from 'store/deviceHelpers'
import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useThermostatMode = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateThermostatMode = deviceState ? deviceState.ThermostatController.thermostatMode.value : undefined
    const userValue = value && value.thermostatMode && value.thermostatMode.value ? value.thermostatMode.value : undefined
    const thermostatMode = userValue ? userValue : stateThermostatMode

    function getSupportedModes() {
        try { 
            return getController(endpointId, "ThermostatController").configuration.supportedModes 
            }
        catch {}
        return []
    }

    function setThermostatMode(newMode) {
        activeDirective(endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": newMode }} )
    }; 

    const supportedModes = getSupportedModes()
    const selections = supportedModes.map( mode => { return { label : mode, value : mode}})
    const thermostatModeLabel = camelCase(thermostatMode)

    // set default in activity editor
    if (directive && value === undefined) {
        setThermostatMode(stateThermostatMode)
    }
    
    return { thermostatModeLabel, setThermostatMode, supportedModes, thermostatMode, selections }

}

export default useThermostatMode
