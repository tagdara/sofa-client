import React, { useState, useEffect } from 'react';
import { Image, Loader, Paper } from '@mantine/core';

import { useInterval } from 'store/useInterval';
import { directive } from 'store/directive'
import { useRegister } from 'store/useRegister'

const CameraImage = props => {

    //const [imageLoaded, setImageLoaded] = useState(false);
    const [updateUri, setupdateUri] = useState("");
    const [imageUri, setImageUri] = useState(undefined)

    const { device, deviceState } = useRegister(props.endpointId)
    const name = device ? device.name : ""

    const unreachable = deviceState && deviceState.EndpointHealth ? deviceState.EndpointHealth.connectivity.value.value !== "OK" : true

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
                onClick={props.onClick}
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
