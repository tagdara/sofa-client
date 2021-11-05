import React, { useState, useEffect, useContext } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import ScheduleIcon from '@material-ui/icons/Schedule';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { LayoutContext } from 'layout/LayoutProvider';
import { UserContext } from 'user/UserProvider';

import AutomationItem from 'automation/AutomationItem';
import GridSection from 'components/GridSection';
import useUserStore from 'store/userStore'

const AutomationsLayout = props => {

    const serverUrl = "https://"+window.location.hostname;
    const accessToken = useUserStore(state => state.access_token)
    const { selectPage } = useContext(LayoutContext);
    const { makeFavorite, isFavorite} = useContext(UserContext)
    const [ automations, setAutomations ] = useState([])
    const editing = false
    const [remove, setRemove] = useState(false)
    const [favorites, setFavorites] = useState(props.favorites)
    const [scheduled, setScheduled] = useState(false)

    useEffect(() => {
        loadJSONAutomations()
    // eslint-disable-next-line 
    }, []);

    const loadJSONAutomations = async () => {
        const headers = { authorization : accessToken }
        const response = await fetch(serverUrl + "/list/logic/automations", { headers: headers })
        var result = await response.json()
        fixAutomations(result)
    }

    
    function fixAutomations(autos) {

        var sections=['actions','schedules','triggers','conditions'] 
        
        //for (var auto in autos) {
        for (var i = 0; i < autos.length; i++) {
            for (var j = 0; j < sections.length; j++) {
                if (!autos[i].hasOwnProperty(sections[j])) {
                    console.log('warning', autos[i], 'does not have a',sections[j],'entry')    
                    autos[i][sections[j]]=[]
                }
            }
        }
        setAutomations(autos)
    }
    
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

