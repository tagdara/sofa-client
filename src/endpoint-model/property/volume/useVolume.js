import { useEffect } from 'react'
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'

const useVolume = ( endpointId, value, directive) => {

    const controller = "Alexa.Speaker"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateVolume = deviceState?.[controller]?.volume?.value
    const volume = value?.volume !== undefined ? value.volume : stateVolume

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setVolume(stateVolume)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setVolume = newVolume => {
        activeDirective(endpointId, controller, "SetVolume", {"volume": newVolume})
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
