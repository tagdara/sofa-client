import React, { useEffect, useState } from 'react';
import { selectPage } from 'store/layoutHelpers'

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import AreaLine from 'devices/Area/AreaLine';
import AreaSummaryLine from 'devices/Area/AreaSummaryLine';

import ItemBase from 'components/ItemBase';
import CardControl from 'components/CardControl';
import PlaceholderCard from 'layout/PlaceholderCard';
import LightButton from 'devices/Light/LightButton';
import SceneButton from 'devices/Scene/SceneButton';

import useDeviceStateStore from 'store/deviceStateStore'
import useUserStore from 'store/userStore'
import { sortByName, hasDisplayCategory, hasCapability, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'

const AreaHero = props => {

    const userArea = useUserStore( state => state.preferences.area)
    const [ currentArea, setCurrentArea ] = useState('logic:area:Main')

    const area = deviceByEndpointId(currentArea)
    const areaState = useDeviceStateStore( state => state.deviceStates[currentArea] )

    useEffect(() => {
        register(currentArea, 'AreaHero')
        return function cleanup() {
            unregister(currentArea, 'AreaHero')
        };
    // eslint-disable-next-line 
    }, [currentArea])


    if (!areaState ) { return <PlaceholderCard count={ 6 } /> }
    const children = sortByName(areaState.AreaController.children.value)
    const shortcuts = areaState.AreaController.shortcuts.value
    const currentScene = areaState.AreaController.scene.value
    const name = area.friendlyName
    const areas = children.filter(endpointId => hasCapability(endpointId, "AreaController"))
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))
    const scenes = children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE_TRIGGER"))
    const nonShortcuts = scenes.filter(endpointId => !shortcuts.includes(endpointId))

    function shortcutId(scene) {
        if (shortcuts.includes(scene)) { return shortcuts.indexOf(scene)}
        return "x"
    }
    //const scenes = []

    function selectArea(endpointId) {
        setCurrentArea(endpointId)
    }

    function expandArea(endpointId) {
        selectPage('AreaLayout', {"endpointId": endpointId})
    }

    return (
        <ItemBase>
            <CardControl name={ name } home={userArea} currentArea={currentArea} selectArea={selectArea} expand={expandArea} />
            <AreaSummaryLine endpointId={currentArea} />
            { areas.map(area =>
                <AreaLine key={area} endpointId={area} selectArea={selectArea} />
            )}
            { nonShortcuts.length > 0 && 
                <ListItem>
                    <ListItemText primary={"Scenes"} />
                </ListItem>            
            }
            { nonShortcuts.map(scene =>
                <ListItem key={scene}>
                    <SceneButton  endpointId={scene} shortcut={shortcutId(scene)} small={true}
                                    computedLevel={currentScene} highlight={true} />
                </ListItem>
            )}
            { lights.length > 0 && 
                <ListItem>
                    <ListItemText primary={"Lights"} />
                </ListItem>            
            }
            { lights.map(light =>
                <ListItem key={light}>
                    <LightButton endpointId={light} skipPrefix={name} />
                </ListItem>
            )}
        </ItemBase>
    );
}

export default AreaHero
