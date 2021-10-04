import React, { useContext, useState, useEffect } from 'react';
//import { makeStyles } from '@material-ui/styles';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';
//import ChristmasTreeIcon from './ChristmasTreeIcon';

import { LayoutContext } from 'layout/LayoutProvider';
import { DataContext } from 'DataContext/DataProvider';

import CardBase from 'components/CardBase';
import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';
//import IconButton from '@material-ui/core/IconButton';

//const useStyles = makeStyles(theme => {
//    return {
//        treeOn: {
//            backgroundColor: "rgba(255,255,0,0.1)"
//        }
//    }
//})

export default function LightHero(props) {

    //const classes = useStyles();

    const { selectPage } = useContext(LayoutContext);
    const {cardReady, deviceStates, getEndpointIdsByCategory, unregisterDevices, isReachable } = useContext(DataContext);
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
    
    //function treeOn() {
    //    try { 
    //        if (deviceState('insteon:node:1A F1 A5 1').PowerController.powerState.value==='ON') {
    //            return true
    //        }
    //    }
    //    catch {
    //        console.log('didnt work',deviceState('insteon:node:1A F1 A5 1'))
    //        
    //    }
     //   return false
    //}
    
    //function toggleTree() {
    //    directive('insteon:node:1A F1 A5 1', 'PowerController', deviceState('insteon:node:1A F1 A5 1').PowerController.powerState.value==='OFF' ? 'TurnOn' : 'TurnOff')
    //}
    
    if (!cardReady('LightHero')) {
        return <PlaceholderCard />
    }

    // secondaryActions={<IconButton className={treeOn() ? classes.treeOn : classes.treeOff} onClick={()=>toggleTree() } ><ChristmasTreeIcon treeOn={ treeOn() } /></IconButton>}


    return (
        <CardBase >
            <SofaListItem   avatarState={lightCount('on') ? "on" : "off"} avatarClick={ () => selectPage('LightLayout') } labelClick={ () => selectPage('LightLayout') }
                            avatar={<LightbulbOutlineIcon/>} noPad={true}
                            primary={lightCount('on') ? lightCount('on')+" lights are on" : "All lights off" }
                            inlineSecondary={true}
            />
        </CardBase>

    );
}
