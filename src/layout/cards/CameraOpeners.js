import React, { useState } from 'react';
import { endpointIdByFriendlyName, endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';

import SecurityCamera from 'devices/Camera/SecurityCamera';
import useUserStore from 'store/userStore'
import StatusLock from 'devices/Lock/StatusLock';
import StackCard from 'components/StackCard'
import usePageFrame from 'helpers/usePageFrame'

export default function CameraSelect(props) {

    const userCamera = useUserStore( state => state.preferences.camera)
    const updateUserSetting = useUserStore( state => state.update)
    const cameras = sortByName(endpointIdsByDisplayCategory('CAMERA'))
    const [ currentCamera, setCurrentCamera ] = useState(userCamera)
    const { maxStacks } = usePageFrame()

    function nextCamera() {
        try {
            var cameraPosition = cameras.indexOf(currentCamera)
            cameraPosition = (cameraPosition + 1) % cameras.length
        }
        catch {
            cameraPosition = 0
        }
        updateUserSetting('camera', cameras[cameraPosition])
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
        updateUserSetting('camera', cameras[cameraPosition])
        setCurrentCamera(cameras[cameraPosition])
        return cameras[cameraPosition]
    }

    const getOpener = (opener) => {
        try {
            const endpointId = endpointIdByFriendlyName(opener.deviceName)  
            if (!endpointId) { return null}
            return (
                <StackCard key={endpointId}>
                    <StatusLock endpointId={endpointId} displayName={ opener.displayName } buttonDuration={opener.buttonDuration} setCamera={setCurrentCamera} />
                </StackCard>
            )
        }
        catch {
            return null
        }
    }
    
    const nullOnClick= () => {}

    const activeCamera = currentCamera ? currentCamera : cameras[0]

    if (maxStacks === 1) {
        return (
            <>
                { cameras.map(camera => 
                    <SecurityCamera key={camera} endpointId={camera} onClick={nullOnClick} />
                )}
            </>
        )
    }

    
    return (
        <>
            <SecurityCamera endpointId={activeCamera} selectButtons={true} 
                            nextCamera={nextCamera} prevCamera={prevCamera} 
                            wide={props.wide} top={false} showOffline={true} 
                        />
            { props.openers &&
                <>
                    { props.openers.map( opener => getOpener(opener)) }
                </>
            }
        </>
    );
}