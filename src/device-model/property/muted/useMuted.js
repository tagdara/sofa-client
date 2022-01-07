import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useMuted = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateMuted = deviceState && deviceState.Speaker ? deviceState.Speaker.muted.value : undefined
    const muted = value !== undefined ? value : stateMuted

    const setMute = newState => {
        activeDirective(endpointId, "Speaker", "SetMute", {"mute": newState})
    }

    const mutedLabel = muted ? "On" : "Off"

    const toggle = () => {
        setMute(!muted)
    }

    return { muted, mutedLabel, setMute, toggle }

}

export default useMuted
