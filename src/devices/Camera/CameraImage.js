import React from 'react';
import { Image } from '@mantine/core';
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import useRefreshCameraImage from 'device-model/controller/CameraStreamController/useRefreshCameraImage'
import CameraPlaceholder from 'devices/Camera/CameraPlaceholder'

const CameraImage = props => {

    const { imageUri, imageSrc } = useRefreshCameraImage(props.endpointId, props.refreshInterval)
    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)

    const loading = (!imageUri  || !reachable )

    return (
        <Image  src={ imageSrc }
                styles={{  
                    image: { 
                        width: "100%",
                        aspectRatio: "16/9", 
                    }
                }}
                onClick={props.onClick}
                withPlaceholder={ !imageUri }
                alt={name}
                placeholder={  
                    <CameraPlaceholder loading={loading} />

                }
        />
    )
}

export default CameraImage;
