import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useVolume = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateVolume = deviceState && deviceState.hasOwnProperty('Speaker') ? deviceState.Speaker.volume.value : undefined
    const volume = value !== undefined ? value : stateVolume

    const setVolume = newVolume => {
        activeDirective(endpointId, "Speaker", "SetVolume", {"volume": newVolume})
    }
    
    const increaseVolume  = amount => {
        // These have alexa equivalents that should be implemented properly
        const newVolume = volume + amount
        setVolume(newVolume)
    }

    const decreaseVolume  = amount => {
        // These have alexa equivalents that should be implemented properly
        const newVolume = volume - amount
        setVolume(newVolume)
    }

    const volumeLabel = volume + "%"

    // set default in activity editor
    if (directive && value === undefined) {
        setVolume(stateVolume)
    }

    return { volume, volumeLabel, setVolume, increaseVolume, decreaseVolume }

}

export default useVolume;
