import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'
import { useEffect } from 'react';

const useBrightness = ( endpointId, value, directive) => {

    const controller = "Alexa.BrightnessController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateBrightness = deviceState?.[controller]?.brightness?.value
    const brightness = value?.brightness ? value.brightness : stateBrightness

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setBrightness(stateBrightness)
        }
    // eslint-disable-next-line 
    }, [  ]);   

    const setBrightness = newBrightness => {
        activeDirective(endpointId, controller, "SetBrightness", {"brightness": newBrightness})
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
