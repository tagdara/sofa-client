import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import DotLevel from 'components/DotLevel';
import MultiLightColor from 'devices/Light/MultiLightColor';

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { hasCapability, register, unregister } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {        
        dotLine: {
            display: "flex",
            justifyContent: "space-around",
            padding: 8,
            alignItems: "center",
            height: 64,
            boxSizing: "border-box",
        },
    }
});

const AreaSummaryLine = props => {

    const classes = useStyles();     
    const areaState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'AreaSummaryLine-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'AreaSummaryLine-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])


    if (!areaState) { return null }
    
    const children = areaState.AreaController.children.value
    const shortcuts = areaState.AreaController.shortcuts.value
    const scene = areaState.AreaController.scene.value
    const colorLights = children.filter(endpointId => hasCapability(endpointId, "ColorController"))

    function runShortcut(level) {
        //var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        directive(shortcuts[level], 'SceneController', 'Activate')
    }
    
    function currentLevel() {
        if (shortcuts.includes(scene)) {
            return shortcuts.indexOf(scene)
        }
        return 0
    }

    if (shortcuts.length === 0 && colorLights.length===  0) { return null }

    return (
        <ListItem className={classes.dotLine}>
            { (shortcuts.length > 0) &&
                <DotLevel level={currentLevel()} select={runShortcut} />
            }
            { (colorLights.length > 0) &&
                <MultiLightColor endpointIds={colorLights} />
            }
        </ListItem>
    )

}

export default AreaSummaryLine;