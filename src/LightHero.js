import React, { useContext, useState, useEffect } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import LightbulbOutlineIcon from './LightbulbOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import ToggleAvatar from './ToggleAvatar';
import GridItem from './GridItem';

export default function LightHero(props) {

    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStates, getEndpointIdsByCategory, unregisterDevices, isReachable } = useContext(DataContext);
    const [ lights, setLights]=useState([])
    
    useEffect(() => {
        setLights( getEndpointIdsByCategory('LIGHT', 'LightHero'))
        return function cleanup() {
            unregisterDevices('LightHero');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    function lightCount(condition, source) {
        var count=0;
        for (var j = 0; j < lights.length; j++) {
            var id=lights[j]
            try {
                var light=deviceStates[id]
                if (condition.toLowerCase()==='all') {
                    count=count+1
                } else if (condition.toLowerCase()==='off') {
                    if (light.PowerController.powerState.value==='OFF' || !isReachable(light)) {
                        count=count+1
                    }
                } else if (condition.toLowerCase()==='on') {
                    if (light.PowerController.powerState.value==='ON' && isReachable(light)) {
                        count=count+1
                    }
                }
            }
            catch {
                // TODO/CHEESE - This is still very broken and needs addressing
                //console.log('error - light not ready', id, lights[id])
            }
        }
        return count
    }    

    return (
            <GridItem wide={props.wide}>
                { lightCount('all') ?
                    <ListItem>
                        <ToggleAvatar avatarState={lightCount('on') ? "on" : "none"} onClick={ () => applyLayoutCard('LightLayout') }><LightbulbOutlineIcon/></ToggleAvatar>
                        <ListItemText primary={lightCount('on') ? lightCount('on')+" lights are on" : "All lights off" } onClick={ () => applyLayoutCard('LightLayout') } />
                    </ListItem>
                :
                    <ListItem>
                        <ToggleAvatar avatarState={"notready"} ><PriorityHighIcon/></ToggleAvatar>
                        <ListItemText primary={'Waiting for light data'}/>
                    </ListItem>
                }
            </GridItem>
    );
}
