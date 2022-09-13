import React from 'react';
import { Image } from '@mantine/core';
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import useRefreshCameraImage from 'device-model/controller/CameraStreamController/useRefreshCameraImage'
import CameraPlaceholder from 'devices/Camera/CameraPlaceholder'

const CameraImage = props => {

    const { imageSrc, imageLoaded } = useRefreshCameraImage(props.endpointId, props.refreshInterval)
    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)

    const loading = (!imageLoaded  || !reachable )

    return (
        <Image  src={ imageSrc }
                styles={{  
                    image: { 
                        width: "100%",
                        aspectRatio: "16/9", 
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }
                }}
                radius="sm"
                onClick={props.onClick}
                withPlaceholder={ !imageSrc }
                alt={name}
                placeholder={  
                    <CameraPlaceholder loading={loading} />

                }
        />
    )
}

export default CameraImage;
