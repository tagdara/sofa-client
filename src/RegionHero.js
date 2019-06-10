import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

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
    const [regionSelect,setRegionSelect] = useState(false);
    const [selectedArea,setSelectedArea] = useState(false);
    const [region,setRegion] = useState({});
    const [regionData, setRegionData] = useState({});
    const [regionName,setRegionName] = useState('Main');
    
    function scenesByArea(area) {
        var areascenes=[]
        var devs=props.deviceProperties['logic:area:'+area].children
        for (var i = 0; i < devs.length; i++) {
            var dbn=props.deviceByEndpointId(devs[i])
            if (dbn.displayCategories.includes('SCENE_TRIGGER')) {
                areascenes.push(dbn)
            }
        }
        return areascenes
    }

    function devicesByArea(area) {
        
        var ads=[]
        var devs=props.deviceProperties['logic:area:'+area].children
        for (var i = 0; i < devs.length; i++) {
            var dbn=props.deviceByEndpointId(devs[i])
            if (dbn) {
                ads.push(dbn)
            }
        }
        return ads
        
    }

    function isReachable(dev) {
        if (dev.hasOwnProperty('connectivity')) {
            if (dev.connectivity.hasOwnProperty('value')) {
                if (dev.connectivity.value=='UNREACHABLE') {
                    return false
                }
            }
        }
        return true
    }
 
    function lightCount(condition) {
        var count=0;
        var lights=props.devicesByCategory('LIGHT')

        for (var i = 0; i < lights.length; i++) {
            if (lights[i].hasOwnProperty('displayCategories') && props.deviceProperties.hasOwnProperty(lights[i].endpointId) && props.deviceProperties[lights[i].endpointId].hasOwnProperty('powerState')) {
                if (props.deviceProperties[lights[i].endpointId].powerState && lights[i].displayCategories[0]=='LIGHT') {
                    if (condition.toLowerCase()=='all') {
                        count=count+1
                    } else if (condition.toLowerCase()=='off') {
                        if (props.deviceProperties[lights[i].endpointId].powerState=='OFF' || !isReachable(props.deviceProperties[lights[i].endpointId])) {
                            count=count+1
                        }
                    } else if (condition.toLowerCase()=='on') {
                        if (props.deviceProperties[lights[i].endpointId].powerState=='ON' && isReachable(props.deviceProperties[lights[i].endpointId])) {
                            count=count+1
                        }
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
    }
    
    function closeRegionSelect() {
        setRegionSelect(false)
    }

    function selectArea(name) {
        setSelectedArea(name)
        props.applyLayoutCard('AreaLayout',{"name": name})
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
    
    function getRegionAreas() {

        var areas=[]
        if (props.deviceProperties['logic:area:'+props.region]) {
            var devstate=props.deviceProperties['logic:area:'+props.region].children
            for (var i = 0; i < devstate.length; i++) {
                var child=props.deviceByEndpointId(devstate[i])
                if (child.displayCategories.includes('AREA')) {
                    areas.push(child)
                }
            }
        }
        return areas
    }
    
    return (
        <GridItem wide={props.wide}>
            { lightCount('all') ?
                <ListItem className={classes.topSplit} >
                    <ToggleAvatar avatarState={lightsOn ? "on" : "off"} onClick={ () => props.applyLayoutCard('LightLayout') }><LightbulbOutlineIcon/></ToggleAvatar>
                    <ListItemText primary={lightsOn ? lightCount('on')+" lights are on" : "All lights off" } onClick={ () => props.applyLayoutCard('LightLayout') } />
                    <ListItemSecondaryAction>
                        <IconButton onClick={(e) => props.applyLayoutCard('AreasLayout')}>
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
            {   getRegionAreas().map((area) => 
                <AreaLine theme={props.theme} area={ area } name={ area.friendlyName } areaData={ props.deviceProperties[area.endpointId] } sendAlexaCommand={props.sendAlexaCommand} key={ area.endpointId } shortcuts={area.shortcuts} selectArea={selectArea} ></AreaLine>
            )}
        </GridItem>
    );
}

export default React.memo(withData(withLayout(RegionHero)));
