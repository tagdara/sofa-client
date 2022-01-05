import { useState } from 'react';
import { useInterval } from 'store/useInterval';
import { useCameraImage } from 'device-model/controller/CameraStreamController/useCameraImage'
                                
const useRefreshCameraImage = ( endpointId, userRefreshInterval ) => {
    
    const { imageUri: baseImageUri } = useCameraImage(endpointId)
    const [ imageUri, setImageUri ] = useState(baseImageUri);
    const [ imageSrc, setImageSrc ] = useState(undefined)
    const [ imageLoaded, setImageLoaded ] = useState(false)
    const refreshInterval = userRefreshInterval ? userRefreshInterval * 1000 : 10000

    useInterval(() => {
        if ( baseImageUri ) {
            var newUri = baseImageUri + "?time=" + Date.now()
            setImageLoaded(false)
            var img = new Image();
            img.onload = function() { setImageSrc(img.src); setImageUri(newUri); setImageLoaded(true); }
            img.src = newUri
        }
    }, imageUri ? refreshInterval : 100 );

    return { imageUri, imageSrc, imageLoaded }
}

export default useRefreshCameraImage;
