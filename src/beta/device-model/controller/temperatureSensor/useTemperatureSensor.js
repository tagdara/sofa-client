import { useRegister } from 'store/useRegister'

export const useTemperatureSensor = endpointId => {
    
    const { deviceState } = useRegister(endpointId)
    const temperature = deviceState ? deviceState.TemperatureSensor.temperature.value.value : "--"

    const tempColor = ( temp ) => {
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
    
    const temperatureColor = tempColor(temperature)
    const temperatureLabel = temperature + "°"

    return { temperatureColor, temperature, temperatureLabel }

}

