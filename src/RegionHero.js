import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import LightbulbOutlineIcon from './LightbulbOutline';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import AreaLine from './region/AreaLine';
import ToggleAvatar from './ToggleAvatar';
import GridItem from './GridItem';

const useStyles = makeStyles({
        
    topSplit: {
        paddingBottom: 24,
    }
});

function RegionHero(props) {
    
    const lightsOn = lightCount('on')>0;
    const classes = useStyles();
    const [areas, setAreas] = useState({});
    const [scenes, setScenes] = useState([]);
    const [regionSelect,setRegionSelect] = useState(false);
    const [selectedArea,setSelectedArea] = useState(false);
    const [region,setRegion] = useState({});
    const [regionData, setRegionData] = useState({});
    const [regionName,setRegionName] = useState('Main');
    
    function sceneDataByArea(area) {
        
        var areascenes={}
        if (areas.hasOwnProperty(area)) {
            for (var scene in areas[area].scenes) {
                if (scenes.hasOwnProperty(scene)) {
                    areascenes[scene]=scenes[scene]
                }
            }
        }   
        return areascenes
    }
    
    function areaSceneList(area) {

        if (areas.hasOwnProperty(area)) {
            if (areas[area].hasOwnProperty('scenes')) {
                return areas[area].scenes
            }
        }
        return {}
    }
    
    function areaShortcuts(area) {

        if (areas.hasOwnProperty(area)) {
            if (areas[area].hasOwnProperty('shortcuts')) {
                return areas[area].shortcuts
            }
        }
        return {}
    }
    
    function scenesByArea(area) {
        var areascenes={}
        if (areas.hasOwnProperty(area)) {
            if (areas[area].hasOwnProperty('scenes')) {
                for (var scene in areas[area].scenes) {
                    areascenes[scene]=scenes[scene]
                }
            }
        }

        return areascenes
    }

    function shortcutsByArea(area) {

        if (areas.hasOwnProperty(area)) {
            if (areas[area].hasOwnProperty('shortcuts')) {
                return areas[area].shortcuts
            }
        }
        return {}
    }


    function devicesByArea(area) {

        var ads=[]
        if (areas.hasOwnProperty(area)) {
            for (var dev in areas[area].lights) {
                var dbn=props.deviceByName(dev)
                if (dbn) {
                    ads.push(dbn)
                }
            }
        }
        return ads
    }
 
    function lightCount(condition) {
        var count=0;
        for (var i = 0; i < props.devices.length; i++) {
            var dev=props.devices[i]
            if (dev.hasOwnProperty('displayCategories') && props.deviceProperties[dev.friendlyName].hasOwnProperty('powerState')) {
                if (props.deviceProperties[dev.friendlyName].powerState && dev.displayCategories[0]=='LIGHT') {
                    if (condition.toLowerCase()=='all' || props.deviceProperties[dev.friendlyName].powerState.toLowerCase()==condition.toLowerCase()) {
                        count=count+1
                    }
                }
            }
        }
        return count
    }  
    
    function handleEdit() {
        setShowEditor(true)
    }

    function selectRegion(newregion) {
        
        setRegionSelect(false)
        if (newregion) { 
            setRegion(newregion) 
        } else {
            newregion=region
            setRegion(region) 
        }
        
        fetch('/list/logic/region/'+newregion)
            .then(result=>result.json())
            .then(result=>this.setState(result))
    }
    
    function closeRegionSelect() {
        setRegionSelect(false)
    }

    function selectArea(name) {
        setSelectedArea(name)
        props.setLayoutCard('AreaLayout',{"name": name})
        //this.setState({ selectedArea: name, showAreaDialog: true} )
    }
    
    function confirmRegion(data) {
        
        if (!data.hasOwnProperty(region)) {
            data[region]=[]
        }
        setRegionData(data);
    }

    function saveRegion(name, data) {
        
        var rdata=regionData
        rdata[name]=data
        setRegionData(rdata)
        regionSaveChanges()
        
    }
    
    function regionSaveChanges(thisregion) {
        fetch('/save/logic/region'+thisregion, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(thisregion)
            })
    }
    
   function loadRegionData(regiondata) {
       if (regiondata.hasOwnProperty('scenes')) {
           setScenes(regiondata['scenes'])
       }
       if (regiondata.hasOwnProperty('areas')) {
           setAreas(regiondata['areas'])
       }
   }
    
    useEffect(() => {
  	    fetch('/list/logic/region/'+props.region)
 		    .then(result=>result.json())
 		    .then(result=> loadRegionData(result));
    }, []);

    return (
        <GridItem wide={props.wide}>
            { lightCount('all') ?
                <ListItem className={classes.topSplit} >
                    <ToggleAvatar avatarState={lightsOn ? "on" : "off"} onClick={ () => props.setLayoutCard('LightLayout') }><LightbulbOutlineIcon/></ToggleAvatar>
                    <ListItemText primary={lightsOn ? lightCount('on')+" lights are on" : "All lights off" } onClick={ () => props.setLayoutCard('LightLayout') } />
                    <ListItemSecondaryAction>
                        <IconButton onClick={(e) => props.setLayoutCard('RegionsLayout')}>
                            <ViewModuleIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            :
                <ListItem>
                    <ToggleAvatar avatarState={"notready"} ><PriorityHighIcon/></ToggleAvatar>
                    <ListItemText primary={'Waiting for light data'}/>
                </ListItem>
            }
            { Object.keys(areas).map((name) => 
                <AreaLine theme={props.theme} sendAlexaCommand={props.sendAlexaCommand} key={ name } name={ name } shortcuts={areaShortcuts(name)} scenes={areaSceneList(name)} sceneData={scenesByArea(name)} devices={ devicesByArea(name)} deviceProperties={ props.propertiesFromDevices(devicesByArea(name)) } selectArea={selectArea} ></AreaLine>
            )}
        </GridItem>
    );
}

export default withData(RegionHero);
