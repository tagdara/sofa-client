import { useState } from 'react';
import { useInterval } from 'helpers/useInterval';
import { useCameraImage } from 'endpoint-model/controller/CameraStreamController/useCameraImage'
import useTokenImage from 'helpers/useTokenImage'
                                
const useRefreshCameraImage = ( endpointId, userRefreshInterval ) => {
    
    const { imageUri: baseImageUri } = useCameraImage(endpointId)
    const [ imageUri, setImageUri ] = useState(baseImageUri);
    //const [ imageSrc, setImageSrc ] = useState(undefined)
    //const [ imageLoaded, setImageLoaded ] = useState(false)
    const refreshInterval = userRefreshInterval ? userRefreshInterval * 1000 : 10000
    const { localImageUrl: imageSrc, imageLoaded } = useTokenImage(imageUri)

    useInterval(() => {
        if ( baseImageUri ) {
            var newUri = baseImageUri + "?time=" + Date.now()
            setImageUri(newUri)
            //setImageLoaded(false)
            //var img = new Image();
            //img.onload = function() { setImageSrc(img.src); setImageUri(newUri); setImageLoaded(true); }
            //img.src = newUri
        }
    }, imageUri ? refreshInterval : 100 );

    return { imageUri, imageSrc, imageLoaded }
}

export default useRefreshCameraImage;
