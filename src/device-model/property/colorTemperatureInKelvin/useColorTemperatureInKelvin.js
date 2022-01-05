import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useColorTemperatureInKelvin = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateColorTemperature = deviceState && deviceState.hasOwnProperty('ColorTemperatureController') ? deviceState.ColorTemperatureController.colorTemperatureInKelvin.value : undefined
    const userValue = value && value.colorTemperatureInKelvin ? value.colorTemperatureInKelvin : undefined
    const colorTemperatureInKelvin = userValue ? userValue : stateColorTemperature

    const setColorTemperature = newColorTemperature => {
        activeDirective(endpointId, "ColorTemperatureController", "SetColorTemperature", { "colorTemperatureInKelvin": newColorTemperature })
    }
    
    const colorTemperatureLabel = colorTemperatureInKelvin + "°"

    return { colorTemperatureInKelvin, colorTemperatureLabel, setColorTemperature }

}

export default useColorTemperatureInKelvin;
