import React, { useState, useEffect, useContext } from 'react';

import { DataContext } from './DataContext/DataProvider';
import { NetworkContext } from './NetworkProvider';
import { LayoutContext } from './layout/NewLayoutProvider';

import AutomationItem from './automation/automationItem';
import GridSection from './GridSection';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function AutomationsFavorites(props) {

    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceByEndpointId } = useContext(DataContext);
    const { getJSON } = useContext(NetworkContext);

    const [automations, setAutomations] = useState({})

    const serverurl="https://"+window.location.hostname;
    
    useEffect(() => {
        getJSON('list/logic/automations')
            .then(result=>setAutomations(result))
    }, [getJSON, serverurl]);
    
    function runAutomation(name) {
        var auto=deviceByEndpointId('logic:activity:'+name)
        console.log('auto',name, auto)
        auto.SceneController.directive('Activate')
        return true
    }

    return (    
        <GridSection name={"Automations"} secondary={
            <IconButton onClick={() => applyLayoutCard('AutomationsLayout', {'favorites':false})}>
                <EditIcon fontSize="small" />
            </IconButton>
        }
        >
        { Object.keys(automations).sort().map(automation => 
            ( automations[automation].favorite &&
                <AutomationItem launcher={true} key={automation} icon={"base"} name={automation} automation={ automations[automation] } run={runAutomation} select={runAutomation} />
            )
        )}
        </GridSection>
    )
};