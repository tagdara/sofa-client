import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { hsv2rgb } from 'helpers/colorHelpers';

const useColor = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const stateColor = deviceState && deviceState.hasOwnProperty('ColorController') ? deviceState.ColorController.color.value : undefined
    const color = value !== undefined ? value : stateColor
    const colorHex = color ? hsv2rgb(color) : undefined

    const colorMantine = color ? { "hue": color.hue, "saturation": color.saturation * 100, "brightness": color.brightness } : undefined

    const setColor = newColor => {
        activeDirective(endpointId, 'ColorController', 'SetColor', { "color" : newColor }, {})
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setColor(stateColor)
    }

    return { color, colorHex, colorMantine, setColor }

}

export default useColor;
