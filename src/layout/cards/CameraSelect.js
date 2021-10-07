import React, { useContext, useState } from 'react';
import { DeviceContext } from 'context/DeviceContext';
import { UserContext } from 'user/UserProvider';

import SecurityCamera from 'devices/Camera/SecurityCamera';

export default function CameraSelect(props) {

    const { endpointIdsByCategory,sortByName } = useContext(DeviceContext);
    const { chooseUserCamera, userCamera } = useContext(UserContext);
    const cameras = sortByName(endpointIdsByCategory('CAMERA'))
    const [ currentCamera, setCurrentCamera ] = useState(userCamera)

    function nextCamera() {
        try {
            var cameraPosition = cameras.indexOf(currentCamera)
            cameraPosition = (cameraPosition + 1) % cameras.length
        }
        catch {
            cameraPosition = 0
        }
        chooseUserCamera(cameras[cameraPosition])
        setCurrentCamera(cameras[cameraPosition])
        return cameras[cameraPosition]
    }

    function prevCamera() {
        try {
            var cameraPosition = cameras.indexOf(currentCamera)
            cameraPosition = ((cameraPosition - 1 ) + cameras.length) % cameras.length
        }
        catch {
            cameraPosition = cameras.length -1
        }
        chooseUserCamera(cameras[cameraPosition])
        setCurrentCamera(cameras[cameraPosition])
        return cameras[cameraPosition]
    }

    return (
        <SecurityCamera endpointId={currentCamera} selectButtons={true} 
                        nextCamera={nextCamera} prevCamera={prevCamera} 
                        wide={props.wide} top={false} showOffline={true} 
                    />
    );
}