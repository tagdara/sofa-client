import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Light from './light/Light';
import GridBreak from './GridBreak';
import GridSection from './GridSection';

import Scene from './Scene'
import SceneAdd from './SceneAdd'

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

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

function AreaLayout(props) {

    const classes = useStyles();
    const isMobile = window.innerWidth <= 800;
    const [areaData, setAreaData] = useState({ shortcuts:{} })
    const [scenes, setSceneData] = useState({})
    const [edit, setEdit] = useState(false)
    const [computedLevel, setComputedLevel] = useState(0)
    const [filter, setFilter] = useState('ALL');
    const [brightControl, setBrightControl] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [colorControl, setColorControl] = useState(false)
    const [level, setLevel] = useState(0);
    const [newScene, setNewScene] = useState(false);


    function childrenByArea(filter) {

        var ads=[]
        var devs=props.deviceProperties['logic:area:'+props.layout.props.name].children
        for (var i = 0; i < devs.length; i++) {
            var dev=props.deviceByEndpointId(devs[i])
            if (!filter || filter=='ALL' || (dev && dev.displayCategories.includes(filter))) {
                var dbe=props.deviceByEndpointId(devs[i])
                if (dbe) {
                    ads.push(dbe)
                }
            }
        }
        return ads
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
        if (filter=="ALL") { return all.sort(nameSort) }
        for (var j = 0; j < all.length; j++) {
            if (props.deviceProperties[all[j].endpointId].powerState==filter) {
                lights.push(all[j])
            }
        }
        return lights.sort(nameSort)
    }


    function devicesByArea() {

        var ads=[]
        if (areaData.hasOwnProperty('lights')) {
            for (var dev in areaData.lights) {
                var dbn=props.deviceByName(dev)
                if (dbn) {
                    ads.push(dbn)
                }
            }
        }

        return ads
    }
    
    function OldisAShortcut(scene) {
        for (var shortcut in areaData.shortcuts) {
            if (areaData.shortcuts[shortcut]==scene) {
                return shortcut
            } 
        }
        return 'x'
    }

    function isAShortcut(scene) {
        if (props.deviceProperties['logic:area:'+props.layout.props.name].shortcuts.indexOf(scene) >= 0) {
            return props.deviceProperties['logic:area:'+props.layout.props.name].shortcuts.indexOf(scene)
        } else {
            return 'x'
        }

    }

    
    function sortByShortcuts() {

        var outscenes=[]
        var allscenes=childrenByArea('SCENE_TRIGGER')
        var shortcutlist=[...props.deviceProperties['logic:area:'+props.layout.props.name].shortcuts].reverse()
        for (var j = 0; j < shortcutlist.length; j++) {
            outscenes.push(props.deviceByEndpointId(shortcutlist[j]))
        }
        
        for (var j = 0; j < allscenes.length; j++) {
            if (!shortcutlist.includes(allscenes[j].endpointId)) {
                outscenes.push(allscenes[j])
            }
        }
        
        return outscenes
            
    }

    function runScene(sceneName) {
        props.sendAlexaCommand(sceneName, "logic:scene:"+sceneName, "SceneController", "Activate")
    }

    function snapScene(sceneName) {
        props.sendAlexaCommand('', "logic:area:"+props.layout.props.name, "AreaController", "Snapshot", sceneName)
    }

    
    function addScene() {}
    function setShortcut() {}
    function deleteScene() {}
    function levelsChange() {}
    
    return (    
        <React.Fragment>
            <GridSection name={props.layout.props.name+" Lights"}
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
            
                            <Button onClick={ () => setFilter('ALL')} color={ filter=='ALL' ? "primary" : "default"} className={classes.button }>
                                All
                            </Button>
                            <Button onClick={ () => setFilter('ON')} color={ filter=='ON' ? "primary" : "default"} className={classes.button }>
                                On
                            </Button>
                        </>
                    } 
            >
                { filterByType(filter).map((device) =>
                    <Light key={ device.endpointId } sendAlexaCommand={props.sendAlexaCommand} name={ device.friendlyName }
                        device={ device } deviceProperties={ props.deviceProperties[device.endpointId] } 
                        brightControl={brightControl} tempControl={tempControl} colorControl={colorControl}
                        />
                )}
            </GridSection>
            <GridSection name={"Scenes"} secondary={
                <>
                    <IconButton onClick={ () => addScene() } className={classes.button }>
                        <AddIcon fontSize="small" />
                    </IconButton> 
                    <IconButton onClick={ () => setNewScene(true) } className={classes.button }>
                        <CameraIcon fontSize="small" />
                    </IconButton> 
                </>
            }

            >
                { newScene && <SceneAdd areaid={"logic:area:"+props.layout.props.name} setNewScene={setNewScene} sendAlexaCommand={props.sendAlexaCommand} /> }
                { sortByShortcuts().map(scene => 
                    <Scene key={scene.endpointId} endpointId={scene.endpointId} shortcut={isAShortcut(scene.endpointId)} sendAlexaCommand={props.sendAlexaCommand} name={scene.friendlyName} computedLevel={props.deviceProperties['logic:area:'+props.layout.props.name].scene} />
                )}
            </GridSection>

        </React.Fragment>
    )
};

export default withData(withLayout(AreaLayout));