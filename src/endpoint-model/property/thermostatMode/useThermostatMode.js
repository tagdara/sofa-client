import { useEffect } from 'react';
import { camelCase } from 'helpers/camelCase'
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'
import { getControllerInterface } from 'endpoint-model/discovery'

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

 
    function setThermostatMode(newMode) {
        activeDirective(endpointId, controller, "SetThermostatMode",  {"thermostatMode" : { "value": newMode }} )
    }; 

    const supportedModes = getControllerInterface(endpointId, controller)?.configuration?.supportedModes || []
    const selections = supportedModes.map( mode => { return { label : mode, value : mode}})
    const thermostatModeLabel = camelCase(thermostatMode)

    
    return { thermostatModeLabel, setThermostatMode, supportedModes, thermostatMode, selections }

}

export default useThermostatMode
