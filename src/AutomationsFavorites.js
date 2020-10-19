import React, { useContext, useState} from 'react';

import { DeviceContext } from './DataContext/DeviceProvider';
import { LayoutContext } from './layout/NewLayoutProvider';
import { UserContext } from './user/UserProvider';
import AutomationAll from './automation/AutomationAll';
import AutomationItem from './automation/automationItem';
import GridSection from './GridSection';

export default function AutomationsFavorites(props) {

    const { applyBackPage, applyLayoutCard } = useContext(LayoutContext);
    const { directive, deviceByEndpointId } = useContext(DeviceContext);
    const { favorites } = useContext(UserContext);
    const [ launched, setLaunched] = useState('')
    
    function checkLaunch(response) {
        console.log('response',response)
        //if response.hasOwnPropety
        setTimeout(function() {
            setLaunched("")
        }, 500)
    }
    
    function runAutomation(name) {
        setLaunched('logic:activity:'+name)
        directive('logic:activity:'+name, 'SceneController', 'Activate')
            .then(result=> checkLaunch(result))
        return true
    }
    
    function selectAutomation(automation) {
        applyBackPage('SystemLayout',{})
        applyLayoutCard('AutomationLayout', {'name':automation, 'noBottom':true } )
    }    
    
    function makeFavorite(automation, stat) {
        // this is a stub we don't really want to change it from here
    }

    return (    
        favorites &&
            <GridSection name={"Automations"}>
            { favorites.map(automation => 
                <AutomationItem small={true}
                                launched={automation===launched} makeFavorite={makeFavorite} favorite={true} allowEdit={false} 
                                launcher={true} key={automation} icon={"base"} name={deviceByEndpointId(automation).friendlyName} 
                                automation={ null } run={runAutomation} select={selectAutomation} 
                />
            )}
            <AutomationAll />
            </GridSection>
    )
};