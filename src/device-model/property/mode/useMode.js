import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { getModes, getFullInstance, isModeNonControllable } from 'store/deviceHelpers';

const useMode = ( endpointId, instance, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const shortInstance = instance.includes('.') ? instance.split('.')[1] : instance

    const modes = getModes(endpointId)
    const fullInstance = getFullInstance(endpointId, instance)
    const modeData = modes[shortInstance]
    const selections = modeData ? Object.keys(modeData).map(modeChoice => ({value: modeChoice, label: modeData[modeChoice]})) : []

    const stateMode = deviceState && deviceState.hasOwnProperty(shortInstance) ? deviceState[shortInstance].mode.value : undefined
    const mode = value ? value : stateMode
    const disabled = value === undefined && isModeNonControllable(endpointId, shortInstance) 

    const setMode = newMode => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        console.log(endpointId, "ModeController", "SetMode", {"mode": newMode}, {}, fullInstance)
        activeDirective(endpointId, "ModeController", "SetMode", {"mode": newMode}, {}, fullInstance)
    }
    
    const modeLabel = modeData ? modeData[mode] : "unknown"

    // set default in activity editor
    if (directive && value === undefined) {
        setMode(stateMode)
    }

    return { mode, modeLabel, selections, instance, fullInstance, modes, setMode, disabled }

}

export default useMode;
