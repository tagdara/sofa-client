import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';

import { DeviceContext } from 'DataContext/DeviceProvider'
import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'
import DotLevel from 'components/DotLevel';
import MultiLightColor from 'devices/Light/MultiLightColor';

const useStyles = makeStyles(theme => {
    return {        
        dotLine: {
            display: "flex",
            justifyContent: "center",
            padding: 8,
            alignItems: "center",
            height: 64,
            boxSizing: "border-box",
        },
    }
});

const AreaSummaryLine = React.memo(props => {

    const classes = useStyles();
    const { hasCapability } = useContext(DeviceContext);       

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'AreaSummaryLine')
        return function cleanup() {
            props.unregisterDevices('AreaSummaryLine');
        };
    // eslint-disable-next-line 
    }, [ props.endpointId ])    

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    if (isEmpty(props.deviceState) || !props.deviceState[props.endpointId]) { return null }
    
    const children = props.deviceState[props.endpointId].AreaController.children.value
    const shortcuts = props.deviceState[props.endpointId].AreaController.shortcuts.value
    const scene = props.deviceState[props.endpointId].AreaController.scene.value
    const colorLights = children.filter(endpointId => hasCapability(endpointId, "ColorController"))

    function runShortcut(level) {
        //var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        props.directive(shortcuts[level], 'SceneController', 'Activate')
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

}, deviceStatesAreEqual);

export default dataFilter(AreaSummaryLine)