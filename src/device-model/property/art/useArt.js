
import { useState, useEffect} from "react";
import { useRegister } from 'store/useRegister'

const useArt = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const stateArt = deviceState && deviceState.MediaMetadata && deviceState.MediaMetadata.art ? deviceState.MediaMetadata.art.value : undefined
    const art = value !== undefined ? value : stateArt
    const [ image, setImage ] = useState(undefined)

    useEffect(()=> {
        var img = new Image();
        img.onload = function() { setImage(img) }
        img.src = art
    }, [ art ]);

    return { image, art }

}

export default useArt
