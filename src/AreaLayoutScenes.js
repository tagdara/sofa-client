import React, {useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DataContext } from './DataContext/DataProvider';

import GridSection from './GridSection';

import Scene from './Scene'
import SceneAdd from './SceneAdd'

import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import CameraIcon from '@material-ui/icons/Camera';


const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    },
    button: {
        minWidth: 36
    },
    buttonspacer: {
        minWidth: 36,
        marginRight: 18
    },

});

export default function AreaLayoutScenes(props) {

    const classes = useStyles();
    const { cardReady, registerEndpointIds, devices, unregisterDevices, directive } = useContext(DataContext);

    useEffect(() => {
        registerEndpointIds(props.scenes,'AreaLayoutScenes')
        return function cleanup() {
            unregisterDevices('AreaLayoutScenes');
        };
    // eslint-disable-next-line 
    }, [])


    function isAShortcut(scene) {
        if (props.shortcuts.indexOf(scene) >= 0) {
            return props.shortcuts.indexOf(scene)
        } else {
            return 'x'
        }
    }

    function sortByShortcuts() {

        var outscenes=[]
        for (var j = 0; j < props.shortcuts.length; j++) {
            outscenes.push( props.shortcuts[j] )
        }

        for (j = 0; j < props.scenes.length; j++) {
            if (!props.shortcuts.includes(props.scenes[j])) {
                outscenes.push(props.scenes[j])
            }
        }
        return outscenes
    }
    
    return (
        cardReady('AreaLayoutScenes') ?
        <GridSection name={"Scenes"} secondary={
            <>
                <IconButton onClick={ () => props.setEdit(!props.edit) } className={classes.button }><RemoveIcon fontSize="small" /></IconButton> 
                <IconButton onClick={ () => props.setNewScene(true) } className={classes.button }><CameraIcon fontSize="small" /></IconButton> 
            </>
        }>
            { props.newScene && <SceneAdd area={props.area} setNewScene={props.setNewScene} directive={directive} /> }
            { sortByShortcuts().map(scene => 
                <Scene  remove={props.edit} scene={devices[scene]} key={scene} shortcut={isAShortcut(scene)} small={true}
                        computedLevel={props.areaScene} directive={directive} editing={props.editingScene} edit={props.editScene} />
            )}
        </GridSection>
        : null
    )
};

AreaLayoutScenes.defaultProps = {
    shortcuts: [],
    newScene: false,
}