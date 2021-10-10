import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

import DotLevel from 'components/DotLevel';

const useStyles = makeStyles({
    
    halves: {
        flexGrow: 1,
        flexBasis: 1,
        boxSizing: "border-box",
        cursor: "pointer",
    },
    areaListItem: {
        minHeight: 54,
        paddingRight: 8,
        paddingTop: 0,
        paddingBottom: 0,
    }
});

const AreaLine = React.memo(props => {

    const classes = useStyles(); 

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'AreaSummaryLine')
        return function cleanup() {
            props.unregisterDevices('AreaSummaryLine');
        };
    // eslint-disable-next-line 
    }, [])    

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    if (isEmpty(props.deviceState) || !props.deviceState[props.endpointId]) { return null }
    
    const shortcuts = props.deviceState[props.endpointId].AreaController.shortcuts.value
    const scene = props.deviceState[props.endpointId].AreaController.scene.value
    const name = props.devices[props.endpointId].friendlyName

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

    return (
        <ListItem className={classes.areaListItem}>
            <ListItemText className={classes.halves} onClick={ () => props.selectArea(props.endpointId)}>{name} </ListItemText>
            { (shortcuts.length > 0) &&
                <DotLevel half={true} level={currentLevel()} select={runShortcut} />
            }
        </ListItem>
    );
}, deviceStatesAreEqual);

export default dataFilter(AreaLine)