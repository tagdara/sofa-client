import { useEffect } from 'react';
import { camelCase, getController } from 'store/deviceHelpers'
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'

const useThermostatMode = ( endpointId, value, directive) => {

    const controller = "Alexa.ThermostatController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateThermostatMode = deviceState?.[controller]?.thermostatMode?.value 
    const userValue = value?.thermostatMode?.value
    const thermostatMode = userValue ? userValue : stateThermostatMode

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setThermostatMode(stateThermostatMode)
        }
    // eslint-disable-next-line 
    }, [  ]);

    function getSupportedModes() {
        try { 
            return getController(endpointId, controller).configuration.supportedModes 
            }
        catch {}
        return []
    }

    function setThermostatMode(newMode) {
        activeDirective(endpointId, controller, "SetThermostatMode",  {"thermostatMode" : { "value": newMode }} )
    }; 

    const supportedModes = getSupportedModes()
    const selections = supportedModes.map( mode => { return { label : mode, value : mode}})
    const thermostatModeLabel = camelCase(thermostatMode)

    
    return { thermostatModeLabel, setThermostatMode, supportedModes, thermostatMode, selections }

}

export default useThermostatMode
