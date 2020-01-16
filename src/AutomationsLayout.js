import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { NetworkContext } from './NetworkProvider';

import { makeStyles } from '@material-ui/styles';

import AutomationItem from './automation/automationItem';
import ScheduleItem from './automation/ScheduleItem';

import AutomationAdd from './automation/automationAdd';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import ScheduleIcon from '@material-ui/icons/Schedule';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import GridSection from './GridSection';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

export default function AutomationsLayout(props) {

    const classes = useStyles();
    const { applyBackPage, applyLayoutCard } = useContext(LayoutContext);
    const { deviceByEndpointId } = useContext(DataContext);
    const { getJSON, postJSON } = useContext(NetworkContext);

    const [automations, setAutomations] = useState({})
    const adding = false
    const editing = false
    const [remove, setRemove] = useState(false)
    const [favorites, setFavorites] = useState(true)
    const [scheduled, setScheduled] = useState(false)

    const serverurl="https://"+window.location.hostname;
    
    useEffect(() => {
        getJSON('list/logic/automations')
            .then(result=>fixAutomations(result))
        //fetch(serverurl+'/list/logic/automations')
        //    .then(result=>result.json())
        //    .then(result=>fixAutomations(result))

    }, [getJSON, serverurl]);
    
    function fixAutomations(autos) {
        var sections=['actions','schedules','triggers','conditions'] 
        
        for (var auto in autos) {
            for (var j = 0; j < sections.length; j++) {
                if (!autos[auto].hasOwnProperty(sections[j])) {
                    console.log('warning', auto, 'does not have a',sections[j],'entry')    
                    autos[auto][sections[j]]=[]
                }
            }
        }
        setAutomations(autos)
    }
    
    function selectAutomation(automation) {
        applyBackPage('AutomationsLayout',{})
        applyLayoutCard('AutomationLayout', {'name':automation, 'noBottom':true } )
    }    
    
    function addAutomation(automationName) {

        if (automations.hasOwnProperty(automationName)) {
            console.log('An automation with that name already exists',automationName)
            return false
        } else {
            //var automations=automations
            automations[automationName]={'actionCount': 0, 'conditionCount': 0}
            console.log('Automations will be', automations)
            postJSON('add/logic/automation/'+automationName, [])
                .then(setAutomations(automations))
    
            //fetch(serverurl+'/add/logic/automation/'+automationName, {
            //        method: 'post',
            //        body: JSON.stringify([])
            //    })
            //    .then(setAutomations(automations))
        }
    } 
    
    function deleteAutomation(automationName) {

        console.log('Deleting',automationName,automations)
        delete automations[automationName]
        
        postJSON('del/logic/automation/'+automationName, [])
            .then(setAutomations(automations));

        //fetch(serverurl+'/del/logic/automation/'+automationName, {
         //       method: 'post',
        //        headers: {
        //            'Accept': 'application/json, text/plain, */*',
        //            'Content-Type': 'application/json'
        //        },
        //        body: JSON.stringify([])
        //    })
        //    .then(setAutomations(automations));
    } 
        
    function runAutomation(name) {
        var auto=deviceByEndpointId('logic:activity:'+name)
        auto.SceneController.directive('Activate')
    }

    function newAutomation() {
        applyBackPage('AutomationsLayout',{})
        applyLayoutCard('AutomationLayout', {'noBottom':true})        
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

    return (    
        <React.Fragment>
            <GridSection name={"Automations"} secondary={
                <>
                    <IconButton onClick={ () => newAutomation() } className={classes.button }>
                        <AddIcon fontSize="small" />
                    </IconButton>
                        { Object.keys(automations).length>0 &&
                        <IconButton onClick={ () => { setRemove(!remove); }} className={classes.button }>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        }
                    <IconButton onClick={ () => toggleScheduled() } className={classes.button }>
                        <ScheduleIcon fontSize="small" />
                    </IconButton>
                    <Button onClick={ () => toggleFavorites() }>ALL</Button>
                </> }
            >
            { Object.keys(automations).sort().map(automation => 
                ( (automations[automation].favorite || !favorites) &&
                    <React.Fragment key={ automation+'-reg' }>
                        { (scheduled && automations[automation].schedules.length>0 ) &&
                            <ScheduleItem name={automation} automation={ automations[automation] } select={selectAutomation} run={runAutomation} />
                        }
                        { !scheduled &&
                            <AutomationItem name={automation} automation={ automations[automation] } select={selectAutomation} edit={editing} delete={deleteAutomation} run={runAutomation} />
                        }
                    </React.Fragment>
                )
            )}
            { adding ? 
                <AutomationAdd add={addAutomation} />
            : null }
            </GridSection>
        </React.Fragment>
    )
};