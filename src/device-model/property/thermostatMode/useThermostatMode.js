import { getController } from 'store/deviceHelpers'
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

    var camelSentence = (str) => {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
        {
            return chr.toUpperCase();
        });
    }

    function setThermostatMode(newMode) {
        activeDirective(endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": newMode }} )
    }; 

    const supportedModes = getSupportedModes()
    const selectModes = supportedModes.map( mode => { return { label : mode, value : mode}})
    const thermostatModeLabel = camelSentence(thermostatMode)
    
    return { thermostatModeLabel, setThermostatMode, supportedModes, thermostatMode, selectModes }

}

export default useThermostatMode
