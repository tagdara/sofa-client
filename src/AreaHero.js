import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import LightbulbOutlineIcon from './LightbulbOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import Light from './light/Light';
import AreaLine from './AreaLine';
import ToggleAvatar from './ToggleAvatar';
import GridItem from './GridItem';

export default function AreaHero(props) {

    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStateByEndpointId, lightCount, sortByName, area } = useContext(DataContext);
    const lightsOn = lightCount('on');
    const thisarea = deviceStateByEndpointId('logic:area:'+area)

    function selectArea(name) {
        applyLayoutCard('AreaLayout',{"name": name})
    }
    
    function getAreaAreas() {
        
        var areas=[]
        if (!area || thisarea===undefined) { return [] }
        var children=thisarea.AreaController.children.value
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var child=deviceStateByEndpointId(children[i])
                if (child && child.displayCategories.includes('AREA')) {
                    areas.push(child)
                }
            }
        }
        return areas
    }
    
    function getAreaLights() {

        var areas=[]
        if (!area || thisarea===undefined)  { return [] }
        var children=thisarea.AreaController.children.value
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var child=deviceStateByEndpointId(children[i])
                if (child && child.displayCategories.includes('LIGHT')) {
                    areas.push(child)
                }
            }
            return sortByName(areas)
        }
        return areas
    }
    
    return (
        <GridItem wide={props.wide}>
            { lightCount('all') ?
                <ListItem>
                    <ToggleAvatar noback={true} avatarState={lightsOn ? "on" : "off"} onClick={ () => applyLayoutCard('LightLayout') }><LightbulbOutlineIcon/></ToggleAvatar>
                    <ListItemText primary={lightsOn ? lightsOn+" lights are on" : "All lights off" } onClick={ () => applyLayoutCard('LightLayout') } />
                    <ListItemSecondaryAction>
                        <IconButton onClick={(e) => applyLayoutCard('AreasLayout')}>
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
            {   getAreaAreas().map((area) => 
                <AreaLine area={ area } key={ area.endpointId } selectArea={selectArea} ></AreaLine>
            )}
            {   getAreaLights().map((light) => 
                <Light xs={12} nopaper={true} thinmargin={true} device={ light } key={ light.endpointId } />
            )}

        </GridItem>
    );
}
