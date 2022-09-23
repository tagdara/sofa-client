import { useEffect } from 'react'
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'

const useTitle = (endpointId, value, directive) => {

    const controller = 'Alexa.MediaMetadata'
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateTitle = deviceState?.[controller]?.title?.value 
    const title = value !== undefined ? value : stateTitle

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setTitle(stateTitle)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setTitle = newState => {
        // only for editor
        activeDirective(endpointId, controller, "SetTitle", {"title": newState})
    }

    return { title, setTitle }

}

export default useTitle
