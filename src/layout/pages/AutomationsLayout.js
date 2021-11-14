import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { selectPage } from 'store/layoutHelpers'

import AutomationItem from 'automation/AutomationItem';
import GridSection from 'components/GridSection';
import useLoginStore from 'store/userStore'

import { isFavorite, makeFavorite } from 'store/deviceHelpers';
import { loadActivities } from 'store/activityHelpers';

const AutomationsLayout = props => {

    const serverUrl = "https://"+window.location.hostname;
    const accessToken = useLoginStore(state => state.access_token)
    const [ automations, setAutomations ] = useState([])
    const editing = false
    const [remove, setRemove] = useState(false)
    const [favorites, setFavorites] = useState(props.favorites)
    const [scheduled, setScheduled] = useState(false)

    useEffect(() => {
        loadActivities().then(result => { setAutomations(result)})
    // eslint-disable-next-line 
    }, []);

    if (!automations) { return null }

    function selectAutomation(automation) {
        selectPage('AutomationLayout', {'endpointId':automation, 'noBottom':true } )
    }    
    
    function deleteAutomation(endpointId) {

        var automationName=undefined
        console.log('Deleting', endpointId)
        // TODO/CHEESE - Automations are listed by name, but the delete command now uses endpoint ids
        // This all needs to be sorted out
        for (var auto in automations) {
            if (automations[auto].endpointId===endpointId) {
                automationName=auto
                break
            }
        }

        if (automationName) {
            delete automations[automationName]
            setAutomations(automations)
            delJSONAutomation(endpointId)
        } else {
            console.log('did not find', endpointId, 'in',automations)
        }
    } 
  
    const delJSONAutomation = async (endpointId) => {
        const headers = { authorization : accessToken }
        const body = []
        const response = await fetch(serverUrl+"/del/logic/automation/"+endpointId, { headers: headers, method: "post", body: JSON.stringify(body)})
        return await response.json()
    }

    function newAutomation() {
        selectPage('AutomationLayout', {'noBottom':true})        
    }

    function toggleFavorites() {
        setFavorites(!favorites)
    }

    function toggleScheduled() {
        setScheduled(!scheduled)
        if (!scheduled) {
            setFavorites(false)
        }
    }

    //console.log('automations', automations)

    const automationList = favorites ? automations.filter(automation => isFavorite(automation.endpointId)) : automations 

    return (    
        <>
            <GridSection scroll={true} name={"Automations"} secondary={
                <>
                    <IconButton onClick={ () => newAutomation() } >
                        <AddIcon fontSize="small" />
                    </IconButton>
                        { Object.keys(automations).length>0 &&
                        <IconButton color={ remove ? "primary" : "inherit" } onClick={ () => { setRemove(!remove); }} >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        }
                    <IconButton onClick={ () => toggleScheduled() } >
                        <ScheduleIcon color={ scheduled ? "primary" : "inherit" } fontSize="small" />
                    </IconButton>
                    <Button color={ !favorites ? "primary" : "inherit" } onClick={ () => toggleFavorites() }>ALL</Button>
                </> }
            >
            { automationList.map(automation => 
                <AutomationItem small={true} endpointId={automation.endpointId} key={automation.endpointId}
                                favorite={isFavorite(automation.endpointId)} 
                                allowEdit={true} 
                                select={selectAutomation}
                                automation={ automation }
                                makeFavorite={makeFavorite} deleting={remove} 
                                edit={editing} delete={deleteAutomation} 
                            />
            )}
            </GridSection>
        </>
    )
}

export default AutomationsLayout;

