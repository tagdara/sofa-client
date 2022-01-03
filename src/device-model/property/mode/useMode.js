import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { getModes, isModeNonControllable } from 'store/deviceHelpers';

const useMode = ( endpointId, userInstance, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    console.log('instance', userInstance)
    const instance = userInstance.includes('.') ? userInstance.split('.')[1] : userInstance

    const modes = getModes(endpointId)
    const modeData = modes[instance]
    const selections = Object.keys(modeData).map(modeChoice => ({value: modeChoice, label: modeData[modeChoice]}))

    const stateMode = deviceState && deviceState.hasOwnProperty(instance) ? deviceState[instance].mode.value : undefined
    const userValue = value && value.mode && value.mode.value ? value.mode.value : undefined
    const mode = userValue ? userValue : stateMode
    const disabled = !userValue && isModeNonControllable(endpointId, instance) 

    const setMode = newMode => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, "ModeController", "SetMode", {"mode": newMode}, {}, instance)
    }
    
    const modeLabel = modeData[mode]

    return { mode, modeLabel, selections, instance, modes, setMode, disabled }

}

export default useMode;
