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
import Scene from './Scene'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


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

    useEffect(() => {
        console.log('layoutprops',props.layout.props)
        //fetch('/list/logic/area/'+props.layout.props.name)
        //    .then(result=>result.json())
        //    .then(data=>setAreaData(data))
        //fetch('/list/logic/scenes/')
        //    .then(result=>result.json())
        //    .then(data=>setSceneData(data))

    }, []);

    function childrenByArea(filter) {

        var ads=[]
        var devs=props.deviceProperties['logic:area:'+props.layout.props.name].children
        for (var i = 0; i < devs.length; i++) {
            var dev=props.deviceByEndpointId(devs[i])
            if (!filter || filter=='ALL' || dev.displayCategories.includes(filter)) {
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

    function OldfilterByType(filter) {
        var lights=[]
        var all=devicesByArea(props.layout.props.name)
        if (filter=="ALL") { return all.sort(nameSort) }
        for (var j = 0; j < all.length; j++) {
            if (props.deviceProperties[all[j].endpointId].powerState==filter) {
                lights.push(all[j])
            }
        }
        return lights.sort(nameSort)
            
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
            //for (var i = 0; i < this.state.arealist[area].lights.length; i++) {
               // var dbn=this.props.deviceByName(this.state.arealist[area].lights)
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

    function oldsortByShortcuts() {

        if (areaData.hasOwnProperty('scenes') && areaData.hasOwnProperty('shortcuts')) {
            var sortlist=Object.keys(areaData.scenes).sort().reverse();
            var sc=Object.keys(areaData.shortcuts).sort();
            for (var i = 0; i < sc.length; i++) {
                if (sortlist.indexOf(areaData.shortcuts[sc[i]])>0) {
                    sortlist.splice(sortlist.indexOf(areaData.shortcuts[sc[i]]),1);
                    sortlist.unshift(areaData.shortcuts[sc[i]])
                }
            }  
            return sortlist
        } else {
            return []
        }
            
    }
    
    function runScene(sceneName) {
        props.sendAlexaCommand(sceneName, "logic:scene:"+sceneName, "SceneController", "Activate")
    }
    
    function addScene() {}
    function setShortcut() {}
    function deleteScene() {}
    function levelsChange() {}
    
    return (    
        <React.Fragment>
            <GridBreak label={props.layout.props.name}>
                <Button onClick={ () => setFilter('ALL')} color={ filter=='ALL' ? "primary" : "default"} className={classes.button }>
                    All
                </Button>
                <Button onClick={ () => setFilter('ON')} color={ filter=='ON' ? "primary" : "default"} className={classes.button }>
                    On
                </Button>
            </GridBreak>
            <GridBreak >
                <Button onClick={ () => setBrightControl(!brightControl) } color={ brightControl ? "primary" : "default"} className={classes.button }>
                    Bright
                </Button>
                <Button onClick={ () => setTempControl(!tempControl) } color={ tempControl ? "primary" : "default"} className={classes.button }>
                    Temp
                </Button>
                <Button onClick={ () => setColorControl(!colorControl) } color={ colorControl ? "primary" : "default"} className={classes.button }>
                    Color
                </Button>
            </GridBreak>

            { filterByType(filter).map((device) =>
                <Light key={ device.endpointId } sendAlexaCommand={props.sendAlexaCommand} name={ device.friendlyName }
                    device={ device } deviceProperties={ props.deviceProperties[device.endpointId] } 
                    brightControl={brightControl} tempControl={tempControl} colorControl={colorControl}
                    />
            )}
            
            <GridBreak label={"Scenes"}>
                <IconButton onClick={ () => addScene() } className={classes.button }>
                    <AddIcon fontSize="small" />
                </IconButton>
            </GridBreak>

            { sortByShortcuts().map(scene => 
                <Scene key={scene.endpointId} shortcut={isAShortcut(scene.endpointId)} sendAlexaCommand={props.sendAlexaCommand} name={scene.friendlyName} computedLevel={computedLevel} />
            )}

        </React.Fragment>
    )
};

export default withData(withLayout(AreaLayout));