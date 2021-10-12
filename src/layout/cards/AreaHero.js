import React, { useEffect, useContext, useState } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { UserContext } from 'user/UserProvider';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import { DeviceContext } from 'context/DeviceContext'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AreaLine from 'devices/Area/AreaLine';
import AreaSummaryLine from 'devices/Area/AreaSummaryLine';
// import AreaSummary from 'devices/Area/AreaSummary';
import ItemBase from 'components/ItemBase';
import CardControl from 'components/CardControl';
import PlaceholderCard from 'layout/PlaceholderCard';
import LightButton from 'devices/Light/LightButton';
import SceneButton from 'devices/Scene/SceneButton';

const AreaHero = React.memo(props => {

    const { userArea } = useContext(UserContext);
    const { sortByName, hasDisplayCategory, hasCapability } = useContext(DeviceContext);       
    const { selectPage } = useContext(LayoutContext);
    const [ currentArea, setCurrentArea] = useState('logic:area:Main')

    useEffect(() => {
        props.addEndpointIds('id',currentArea, 'AreaHero')
        return function cleanup() {
            props.unregisterDevices('AreaHero');
        };
    // eslint-disable-next-line 
    }, [ currentArea ])    

    if (isEmpty(props.deviceState) || !props.deviceState[currentArea] ) { return <PlaceholderCard count={ 6 } /> }
    const children = sortByName(props.deviceState[currentArea].AreaController.children.value)
    const shortcuts = props.deviceState[currentArea].AreaController.shortcuts.value
    const currentScene = props.deviceState[currentArea].AreaController.scene.value
    const name = props.devices[currentArea].friendlyName
    const areas = children.filter(endpointId => hasCapability(endpointId, "AreaController"))
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))
    const scenes = children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE_TRIGGER"))
    const nonShortcuts = scenes.filter(endpointId => !shortcuts.includes(endpointId))

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

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
}, deviceStatesAreEqual);

export default dataFilter(AreaHero)
