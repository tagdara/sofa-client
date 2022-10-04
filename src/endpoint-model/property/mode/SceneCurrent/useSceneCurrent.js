import useMode from 'endpoint-model/property/mode/useMode'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

const useSceneCurrent = (endpointId, value, directive) => {

    // Scene property of an Area representing the current "best match" scene
    const instance = 'Scene.Current'
    const { friendlyName, mode, modeLabel, selections, setMode, disabled } = useMode(endpointId, instance, value, directive)
    const sceneEndpointId = mode ? mode.split('.')[1] : "" // Starts with Current.
    const scenefriendlyName = friendlyNameByEndpointId(sceneEndpointId)

    return { sceneEndpointId, scenefriendlyName, friendlyName, mode, modeLabel, selections, instance, setMode, disabled }
}

export default useSceneCurrent 
