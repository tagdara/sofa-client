import { directive as storeDirective } from 'endpoint-model/directive/directive'

const usePlaybackController = ( endpointId, directive) => {

    const controller = "Alexa.PlaybackController"
    // const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const play = () => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, controller, 'Play', { } )
    }

    const pause = () => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, controller, 'Pause', { } )
    }

    const skip = () => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, controller, 'Skip', { } )
    }

    return { play, pause, skip}

}

export default usePlaybackController
