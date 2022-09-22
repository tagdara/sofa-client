import { useEffect } from 'react'
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'
import { hsv2rgb } from 'helpers/colorHelpers';

const useColor = ( endpointId, value, directive) => {

    const controller = 'Alexa.ColorController'
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective

    const stateColor = deviceState?.[controller]?.color?.value || {}
    const color = value?.color ? value.color : stateColor
    const colorHex = color ? hsv2rgb(color) : undefined

    const colorMantine = color ? { "hue": color.hue, "saturation": color.saturation * 100, "brightness": color.brightness } : undefined

    const setColor = newColor => {
        activeDirective(endpointId, controller, 'SetColor', { "color" : newColor }, {})
    }

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setColor(stateColor)
        }
    // eslint-disable-next-line 
    }, [  ]);

    return { color, colorHex, colorMantine, setColor }

}

export default useColor;
