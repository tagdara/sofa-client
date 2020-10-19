import React, { useContext, useState, useEffect } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import LightbulbOutlineIcon from './LightbulbOutline';
import CardBase from './CardBase';
import SofaListItem from './SofaListItem';
import PlaceholderCard from './PlaceholderCard';

export default function LightHero(props) {

    const { selectPage } = useContext(LayoutContext);
    const { cardReady, deviceStates, getEndpointIdsByCategory, unregisterDevices, isReachable } = useContext(DataContext);
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
    
    if (!cardReady('LightHero')) {
        return <PlaceholderCard />
    }

    return (
        <CardBase >
            <SofaListItem   avatarState={lightCount('on') ? "on" : "none"} onClick={ () => selectPage('LightLayout') }
                            avatar={<LightbulbOutlineIcon/>} noPad={true}
                            primary={lightCount('on') ? lightCount('on')+" lights are on" : "All lights off" }
            />
        </CardBase>

    );
}
