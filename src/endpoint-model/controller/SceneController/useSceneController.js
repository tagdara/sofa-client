import { useEffect, useState } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { useInterval } from 'helpers/useInterval';
import { directive as storeDirective } from 'endpoint-model/directive/directive'

const useSceneController = ( endpointId, currentScene, directive) => {

    const controller = "Alexa.SceneController"
    const { device, deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const name = device.friendlyName
    const [ working, setWorking ] = useState(false)
    const active = endpointId === currentScene
    const running = deviceState?.["Scene.Running"]?.toggleState?.value === 'ON'

    useInterval(() => {
        setWorking(false)
    }, working ? 5000 : null);

    useEffect(() => {
        setWorking(false)
    }, [ currentScene ]);

    // Since Scenes do not have a 'running' attribute, Working is provided to simulate running for those that are not sofa native, but in general
    // running should be used

    const activate = () => {
        console.log('Activating', name)
        setWorking(true)
        activeDirective(endpointId, controller, 'Activate')
    }

    return { name, active, running, working, activate }

}

export default useSceneController
