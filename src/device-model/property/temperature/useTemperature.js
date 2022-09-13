import { useRegister } from 'store/useRegister'

const useTemperature = ( endpointId, value, directive) => {
    
    const { device, deviceState } = useRegister(endpointId)
    const stateTemperature = deviceState ? deviceState.TemperatureSensor?.temperature?.value?.value : undefined
    const temperature = value !== undefined ? value : stateTemperature

    const setTemperature = newTemp => {
        // only for activity editor
        directive(endpointId, "TemperatureSensor", "SetTemperature", { "temperature": { "value": newTemp, "scale": "FAHRENHEIT"}} )
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

    // set default in activity editor
    if (directive && value === undefined) {
        setTemperature(stateTemperature)
    }

    return { device, temperature, temperatureLabel, temperatureColor, setTemperature }

}

export default useTemperature
