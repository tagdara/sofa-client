import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'
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
    if (!device) { return {} }
    for (var k = 0; k < device.capabilities?.length; k++) {
        if (device.capabilities[k].interface.endsWith('ModeController') && device.capabilities[k].instance === instance) {
            return device.capabilities[k]
        }
    }
    return {}
}

const useMode = ( endpointId, instance, value, directive) => {

    // Mode is an instanced controller and the endpointState is stored by instance name

    const controller = "Alexa.ModeController"
    const { deviceState } = useRegister(endpointId)
    const device = useDeviceStore( state => state.devices[endpointId] )
    const modeCapability = getMode(device, instance)

    const nonControllable = modeCapability?.properties?.nonControllable || false
    const friendlyName = modeCapability?.capabilityResources?.friendlyNames[0]?.value?.text || "unknown"
    const activeDirective = directive || storeDirective

    const modeData = getModeSelections(modeCapability)

    const selections = Object.keys(modeData).map(modeChoice => ({ value: modeChoice, label: modeData[modeChoice] })) || []
    const stateMode = deviceState?.[instance]?.mode.value
    const mode = value?.mode ? value.mode : stateMode

    const disabled = value === undefined && nonControllable
    const modeLabel = modeData ? modeData[mode] : friendlyName

    const setMode = newMode => {
        activeDirective(endpointId, controller, "SetMode", {"mode": newMode}, {}, instance)
    }

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setMode(stateMode)
        }
    // eslint-disable-next-line 
    }, [  ]);

    return { mode, modeLabel, selections, instance, setMode, disabled }

}

export default useMode;
