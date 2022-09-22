import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'

const useTemperature = ( endpointId, value, directive) => {

    const controller = "Alexa.TemperatureSensor"
    const { device, deviceState } = useRegister(endpointId)
    const stateTemperature = deviceState?.[controller]?.temperature?.value?.value
    const temperature = value?.temperature?.value !== undefined ? value.temperature.value : stateTemperature

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setTemperature(stateTemperature)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setTemperature = newTemp => {
        // only for activity editor
        directive(endpointId, controller, "SetTemperature", { "temperature": { "value": newTemp, "scale": "FAHRENHEIT"}} )
    }

    const getColor = ( temp ) => {
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
    
    const temperatureColor = getColor(temperature)
    const temperatureLabel = temperature +"°"


    return { device, temperature, temperatureLabel, temperatureColor, setTemperature }

}

export default useTemperature
