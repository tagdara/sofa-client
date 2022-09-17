import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { getFullInstance, isModeNonControllable } from 'store/deviceHelpers';
import useDeviceStore from 'store/deviceStore'


const getModeSelections = (modeCapability) => {
    if (!modeCapability) return []
    var supportedModes = modeCapability.configuration?.supportedModes || []
    return supportedModes.reduce(function(result, mode) {
        // TODO/CHEESE Some devices are not pushing the actual text friendly names and this is likely a problem sourced
        // from the adapters themselves.  This leaves the selection block blank with 'undefined' options and breaks the 
        // activity builder.  using the mode value as a default instead
        var selectionfriendlyName = mode.modeResources?.friendlyNames[0]?.value?.text || mode.value
        return { ...result, [mode.value]: selectionfriendlyName }
    }, [])

}

const getMode = (device, instance) => {

    for (var k = 0; k < device.capabilities.length; k++) {
        if (device.capabilities[k].interface.endsWith('ModeController') && device.capabilities[k].instance === instance) {
            return device.capabilities[k]
        }
    }
    return {}
}

const useMode = ( endpointId, instance, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const device = useDeviceStore( state => state.devices[endpointId] )
    const modeCapability = getMode(device, instance)
    const friendlyName = modeCapability.capabilityResources?.friendlyNames[0]?.value?.text || "unknown"
    const activeDirective = directive ? directive : storeDirective

    const shortInstance = instance && instance.includes('.') ? instance.split('.')[1] : instance

    const fullInstance = getFullInstance(endpointId, instance)
    const modeData = getModeSelections(modeCapability)
    const selections = Object.keys(modeData).map(modeChoice => ({value: modeChoice, label: modeData[modeChoice]})) || []
    const stateMode = deviceState && deviceState.hasOwnProperty(shortInstance) ? deviceState[shortInstance].mode.value : undefined
    const mode = value ? value : stateMode
    const disabled = value === undefined && isModeNonControllable(endpointId, shortInstance) 
    const modeLabel = modeData ? modeData[mode] : friendlyName

    const setMode = newMode => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        console.log(endpointId, "ModeController", "SetMode", {"mode": newMode}, {}, fullInstance)
        activeDirective(endpointId, "ModeController", "SetMode", {"mode": newMode}, {}, fullInstance)
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setMode(stateMode)
    }

    return { mode, modeLabel, selections, instance, fullInstance, setMode, disabled }

}

export default useMode;
