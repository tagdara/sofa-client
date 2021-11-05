import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DotLevel from 'components/DotLevel';

import useDeviceStateStore from 'store/deviceStateStore'
//import useRegisterStore from 'store/registerStore'
import { directive } from 'store/directive'
import { deviceByEndpointId, register, unregister } from 'store/deviceHelpers'

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

const AreaLine = props => {

    const classes = useStyles(); 
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

    return (
        <ListItem className={classes.areaListItem}>
            <ListItemText className={classes.halves} onClick={ () => props.selectArea(props.endpointId)}>{name} </ListItemText>
            { (shortcuts.length > 0) &&
                <DotLevel half={true} level={currentLevel()} select={runShortcut} />
            }
        </ListItem>
    );
}

export default AreaLine