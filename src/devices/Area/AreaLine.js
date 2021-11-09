import React, { useEffect } from 'react';

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import LevelSlider from 'components/LevelSlider';

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'

const AreaLine = props => {

    const area = deviceByEndpointId(props.endpointId)   
    const areaState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'AreaLine-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'AreaLine-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])


    if (!areaState) { return null }
    
    const shortcuts = areaState.AreaController.shortcuts.value
    const scene = areaState.AreaController.scene.value
    const name = area.friendlyName

    function runShortcut(newScene) {
        if (newScene !== scene) {
            console.log('should run', newScene)
            directive(newScene, 'SceneController', 'Activate')
        }
    }
    
    return (
        <CardLine inList={true}>
            <CardLineText onClick={ () => props.selectArea(props.endpointId)} primary={name} />
            { (shortcuts.length > 0) &&
                <LevelSlider half={true} level={scene} select={runShortcut} levels={shortcuts} />
            }
        </CardLine>
    );
}

export default AreaLine