import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'

const useColorTemperatureInKelvin = ( endpointId, value, directive) => {

    const controller = "Alexa.ColorTemperatureController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateColorTemperature = deviceState?.[controller]?.colorTemperatureInKelvin?.value 
    const userValue = value?.colorTemperatureInKelvin
    const colorTemperatureInKelvin = userValue ? userValue : stateColorTemperature

    const setColorTemperature = newColorTemperature => {
        activeDirective(endpointId, controller, "SetColorTemperature", { "colorTemperatureInKelvin": newColorTemperature })
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setColorTemperature(stateColorTemperature)
    }

    const colorTemperatureLabel = colorTemperatureInKelvin + "°"

    return { colorTemperatureInKelvin, colorTemperatureLabel, setColorTemperature }

}

export default useColorTemperatureInKelvin;
