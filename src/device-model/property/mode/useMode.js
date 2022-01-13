import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { getModes, isModeNonControllable } from 'store/deviceHelpers';

const useMode = ( endpointId, userInstance, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const instance = userInstance.includes('.') ? userInstance.split('.')[1] : userInstance

    const modes = getModes(endpointId)
    const modeData = modes[instance]
    const selections = Object.keys(modeData).map(modeChoice => ({value: modeChoice, label: modeData[modeChoice]}))

    const stateMode = deviceState && deviceState.hasOwnProperty(instance) ? deviceState[instance].mode.value : undefined
    const mode = value ? value : stateMode
    const disabled = value === undefined && isModeNonControllable(endpointId, instance) 

    const setMode = newMode => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        console.log(endpointId, "ModeController", "SetMode", {"mode": newMode}, {}, instance)
        activeDirective(endpointId, "ModeController", "SetMode", {"mode": newMode}, {}, userInstance)
    }
    
    const modeLabel = modeData[mode]

    // set default in activity editor
    if (directive && value === undefined) {
        setMode(stateMode)
    }

    return { mode, modeLabel, selections, instance, modes, setMode, disabled }

}

export default useMode;
