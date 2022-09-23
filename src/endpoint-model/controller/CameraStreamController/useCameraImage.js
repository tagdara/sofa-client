import { useState, useEffect } from 'react';
import { directive } from 'endpoint-model/directive/directive'

export const useCameraImage = endpointId => {

    const controller = "Alexa.CameraStreamController"
    //const [imageLoaded, setImageLoaded] = useState(false);
    const [imageUri, setImageUri] = useState(undefined)

    useEffect(()=> {

        function getImageUriFromPayload(data) {

            try {
                var newUri = data.payload.imageUri
                setImageUri(newUri)
            }
            catch(e) {
                console.log('Improper response from InitializeCameraStreams', data)
            }
        }

        if ( endpointId ) { 
            // This should get the static image URI without starting streams unnecessarily
            directive(endpointId, controller, "InitializeCameraStreams", { "cameraStreams": [] })
                .then(response =>{ getImageUriFromPayload(response) } )
        } 

    // eslint-disable-next-line 
    }, [ endpointId ]);

    return { imageUri }
}

export default useCameraImage;
