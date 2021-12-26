import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useVolume = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateVolume = deviceState && deviceState.hasOwnProperty('Speaker') ? deviceState.Speaker.volume.value : undefined
    const userValue = value && value.volume  ? value.volume : undefined
    const volume = userValue ? userValue : stateVolume

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

    return { volume, volumeLabel, setVolume, increaseVolume, decreaseVolume }

}

export default useVolume;
