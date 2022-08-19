import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { getFullInstance, isModeNonControllable } from 'store/deviceHelpers';
import useDeviceStore from 'store/deviceStore'

const getModes = (endpointId, exclude=[]) => {

    var dev = endpointId
    if (typeof(dev)=='string') {
        dev = useDeviceStore.getState().devices[dev]
    }    
    if (!dev) { return {} }
    var modes={}

    for (var k = 0; k < dev.capabilities.length; k++) {
        if (dev.capabilities[k].interface.endsWith('ModeController')) {
            var modeCapability = dev.capabilities[k]
            var supportedModes = modeCapability.configuration.supportedModes

            var modename = modeCapability.capabilityResources.friendlyNames[0].value.text

            if (!exclude.includes(modename)) {
                var modeChoices=[]
                modes[modename] = supportedModes.reduce(function(result, mode) {
                    // TODO/CHEESE Some devices are not pushing the actual text friendly names and this is likely a problem sourced
                    // from the adapters themselves.  This leaves the selection block blank with 'undefined' options and breaks the 
                    // activity builder.  using the mode value as a default instead
                    var selectionfriendlyName = mode.modeResources.friendlyNames[0].value.text ? mode.modeResources.friendlyNames[0].value.text : mode.value
                    return { ...result, [mode.value]: selectionfriendlyName }
                }, modeChoices)
                //for (var j = 0; j < supportedModes.length; j++) {
                //    modechoices[supportedModes[j].value] = supportedModes[j].modeResources.friendlyNames[0].value.text
                //}
                //modes[modename]=[...modechoices]
            }
        }
    }
    return modes
}

const useMode = ( endpointId, instance, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const shortInstance = instance && instance.includes('.') ? instance.split('.')[1] : instance

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
