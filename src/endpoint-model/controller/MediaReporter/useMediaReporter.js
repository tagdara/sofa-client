import { useRegister } from 'endpoint-model/register/useRegister'

const useMediaReporter = ( endpointId, value, directive) => {

    const controller = "Sofa.MediaReporter"
    const { deviceState } = useRegister(endpointId)
    const art = deviceState?.[controller]?.art?.value 
    const artist = deviceState?.[controller]?.artist?.value 
    const title = deviceState?.[controller]?.title?.value 
    const app = deviceState?.[controller]?.app?.value 
    const url = deviceState?.[controller]?.url?.value 

    return { app, art, artist, title, url }

}

export default useMediaReporter
