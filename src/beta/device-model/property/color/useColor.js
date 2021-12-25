import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { hsv2rgb } from 'beta/helpers/colorHelpers'

const useColor = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const stateColor = deviceState && deviceState.hasOwnProperty('ColorController') ? deviceState.ColorController.color.value : undefined
    const userValue = value && value.color  ? value.color : undefined
    const color = userValue ? userValue : stateColor

    console.log('usercolor uservalu', userValue, value)

    const colorHex = color ? hsv2rgb(color) : undefined

    const setColor = newColor => {
        activeDirective(endpointId, 'ColorController', 'SetColor', { "color" : newColor }, {})
    }

    return { color, colorHex, setColor }

}

export default useColor;
