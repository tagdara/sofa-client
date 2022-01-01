import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useBrightness = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateBrightness = deviceState && deviceState.hasOwnProperty('BrightnessController') ? deviceState.BrightnessController.brightness.value : undefined
    const userValue = value && value.brightness  ? value.brightness : undefined
    const brightness = userValue ? userValue : stateBrightness

    const setBrightness = newBrightness => {
        activeDirective(endpointId, "BrightnessController", "SetBrightness", {"brightness": newBrightness})
    }
    
    const increaseBrightness  = amount => {
        // These have alexa equivalents that should be implemented properly
        const newBrightness = brightness + amount
        setBrightness(newBrightness)
    }

    const decreaseBrightness  = amount => {
        // These have alexa equivalents that should be implemented properly
        const newBrightness = brightness - amount
        setBrightness(newBrightness)
    }

    const brightnessLabel = brightness + "%"

    return { brightness, brightnessLabel, setBrightness, increaseBrightness, decreaseBrightness }

}

export default useBrightness;