import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'

const useMuted = (endpointId, value, directive) => {

    const controller = "Alexa.Speaker"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateMuted = deviceState?.[controller]?.muted?.value
    const muted = value !== undefined ? value : stateMuted

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setMute(stateMuted)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setMute = newState => {
        activeDirective(endpointId, controller, "SetMute", {"mute": newState})
    }

    const mutedLabel = muted ? "On" : "Off"

    const toggle = () => {
        alert('toggle')
        setMute(!muted)
    }

    return { muted, mutedLabel, setMute, toggle }

}

export default useMuted
