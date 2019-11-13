import React, {useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Button from '@material-ui/core/Button';
import Light from './light/Light';
import GridSection from './GridSection';

import Scene from './Scene'
import SceneAdd from './SceneAdd'

import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';

import ColorLensIcon from '@material-ui/icons/ColorLens';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
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

export default function AreaLayout(props) {

    const classes = useStyles();
    const { deviceByEndpointId } = useContext(DataContext);
    const { layout } = useContext(LayoutContext);
    
    const [edit, setEdit] = useState(false)
    const [filter, setFilter] = useState('ALL');
    const [brightControl, setBrightControl] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [colorControl, setColorControl] = useState(false)
    const [newScene, setNewScene] = useState(false);
    const area = deviceByEndpointId('logic:area:'+layout.props.name)

    function childrenByArea(filter) {

        var ads=[]
        try {
            var children=area.AreaController.children.value
            for (var i = 0; i < children.length; i++) {
                var dev=deviceByEndpointId(children[i])
                if (!filter || filter==='ALL' || (dev && dev.displayCategories.includes(filter))) {
                    ads.push(dev)
                }
            }
            return ads    
        } catch (e) {
            console.log('Error getting children by area', e)
        } finally {
            return ads
        }
}

    function nameSort(a,b) {
      if (a.friendlyName < b.friendlyName)
        return -1;
      if (a.friendlyName > b.friendlyName)
        return 1;
      return 0;
    }

    function filterByType(filter) {
        var lights=[]
        var all=childrenByArea('LIGHT')
        if (filter.toUpperCase()==="ALL") { 
            return all.sort(nameSort) 
        }
        for (var j = 0; j < all.length; j++) {
            if (all[j].PowerController.powerState.value===filter.toUpperCase()) {
                lights.push(all[j])
            }
        }
        return lights.sort(nameSort)
    }

    function isAShortcut(scene) {
        if (area.AreaController.shortcuts.value.indexOf(scene) >= 0) {
            return area.AreaController.shortcuts.value.indexOf(scene)
        } else {
            return 'x'
        }
    }

    function sortByShortcuts() {

        var outscenes=[]
        try {
            var allscenes=childrenByArea('SCENE_TRIGGER')
            var shortcutlist=[...area.AreaController.shortcuts.value].reverse()
            for (var j = 0; j < shortcutlist.length; j++) {
                outscenes.push(deviceByEndpointId(shortcutlist[j]))
            }
    
            for (j = 0; j < allscenes.length; j++) {
                if (!shortcutlist.includes(allscenes[j].endpointId)) {
                    outscenes.push(allscenes[j])
                }
            }
        } catch (e) {
            console.log('Error getting children by area', e)
        } finally {
            return outscenes
        }
    }
    
    return (    
        <React.Fragment>
            <GridSection name={layout.props.name+" Lights"} break={true}
                    secondary={
                        <>
                            <Button onClick={ () => setBrightControl(!brightControl) } color={ brightControl ? "primary" : "default"} className={classes.button }>
                                <BrightnessLowIcon className={classes.smallicon } />
                            </Button>
                            <Button onClick={ () => setTempControl(!tempControl) } color={ tempControl ? "primary" : "default"} className={classes.button }>
                                <AcUnitIcon className={classes.smallicon } />
                            </Button>
                            <Button onClick={ () => setColorControl(!colorControl) } color={ colorControl ? "primary" : "default"} className={classes.buttonspacer }>
                                <ColorLensIcon className={classes.smallicon } />
                            </Button>
            
                            <Button onClick={ () => setFilter('ALL')} color={ filter==='ALL' ? "primary" : "default"} className={classes.button }>
                                All
                            </Button>
                            <Button onClick={ () => setFilter('ON')} color={ filter==='ON' ? "primary" : "default"} className={classes.button }>
                                On
                            </Button>
                        </>
                    } 
            >
                { filterByType(filter).map(device =>
                    <Light key={ device.endpointId } device={ device }
                        brightControl={brightControl} tempControl={tempControl} colorControl={colorControl}
                    />
                )}
            </GridSection>
            <GridSection name={"Scenes"} secondary={
                <>
                    <IconButton onClick={ () => setEdit(!edit) } className={classes.button }><RemoveIcon fontSize="small" /></IconButton> 
                    <IconButton onClick={ () => setNewScene(true) } className={classes.button }><CameraIcon fontSize="small" /></IconButton> 
                </>
            }>
                { newScene && <SceneAdd area={area} setNewScene={setNewScene} /> }
                { sortByShortcuts().map(scene => 
                    <Scene remove={edit} scene={scene} key={scene.endpointId} shortcut={isAShortcut(scene.endpointId)} computedLevel={area.scene} />
                )}
            </GridSection>

        </React.Fragment>
    )
};