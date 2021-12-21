import { getController } from 'store/deviceHelpers'
import { useRegister } from 'store/useRegister'
import { directive } from 'store/directive'

const useThermostatMode = endpointId => {

    const { deviceState } = useRegister(endpointId)

    function getSupportedModes() {
        try { 
            return getController(endpointId, "ThermostatController").configuration.supportedModes 
            }
        catch {}
        return []
    }

    function setThermostatMode(newMode) {
        directive(endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": newMode }} )
    }; 

    const thermostatMode = deviceState ? deviceState.ThermostatController.thermostatMode.value : undefined
    const supportedModes = getSupportedModes()
    const selectModes = supportedModes.map( mode => { return { label : mode, value : mode}})
    
    return { setThermostatMode, supportedModes, thermostatMode, selectModes }

}

export default useThermostatMode
