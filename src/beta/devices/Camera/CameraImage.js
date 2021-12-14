import React, { useState, useEffect } from 'react';
import { Image, Loader, Paper } from '@mantine/core';

import { useInterval } from 'components/useInterval';
import { register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
//import { checkToken } from 'store/userHelpers'
import useDeviceStateStore from 'store/deviceStateStore'

const CameraImage = props => {

    //const [imageLoaded, setImageLoaded] = useState(false);
    const [updateUri, setupdateUri] = useState("");
    const [imageUri, setImageUri] = useState(undefined)

    const device = deviceByEndpointId(props.endpointId)
    const cameraState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = device ? device.name : ""

    useEffect(() => {
        setImageUri(undefined)
        setupdateUri(undefined) 
        register(props.endpointId, "image-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "image-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])  


    const unreachable = cameraState && cameraState.EndpointHealth ? cameraState.EndpointHealth.connectivity.value.value !== "OK" : true

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

        if ((!unreachable) && (props.endpointId)) { 
            // This should get the static image URI without starting streams unnecessarily
            directive(props.endpointId, "CameraStreamController", "InitializeCameraStreams",{ "cameraStreams": [] })
                .then(response =>{ getImageUriFromPayload(response) } )
        } 
    // eslint-disable-next-line 
    }, [ props.endpointId, unreachable ]);


    useInterval(() => {
        if (imageUri && !props.disabled) {
            setupdateUri(imageUri+"?time="+Date.now())
        }
    }, (imageUri || props.showDialog) ? props.refreshInterval : null);

    return (
        <Image  src={updateUri ? updateUri : "" }
                styles={{  
                    image: { 
                        width: "100%",
                        aspectRatio: "16/9", 
                    }
                }}
                withPlaceholder={!updateUri}
                alt={name}
                placeholder={  <Paper style={{ 
                                            width: "100%", 
                                            aspectRatio: "16/9", 
                                            display: "flex", 
                                            justifyContent: "center", 
                                            alignItems: "center" 
                                        }}
                                >
                                    <Loader style={{ display: updateUri ? "none" : undefined, maxWidth: "30%" }} />
                                </Paper>
                            }
        />
    )
}

export default CameraImage;
