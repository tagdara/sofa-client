import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles } from '@material-ui/styles';

import AutomationItem from './automation/automationItem';
import AutomationAdd from './automation/automationAdd';
import IconButton from '@material-ui/core/IconButton';
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

    const [automations, setAutomations] = useState({})
    const adding = false
    const editing = false
    const [remove, setRemove] = useState(false)
    const serverurl="https://"+window.location.hostname;
    
    useEffect(() => {
        fetch(serverurl+'/list/logic/automationlist')
            .then(result=>result.json())
            .then(result=>setAutomations(result))

    }, [serverurl]);
    
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
    
            fetch(serverurl+'/add/logic/automation/'+automationName, {
                    method: 'post',
                    body: JSON.stringify([])
                })
                .then(setAutomations(automations))
        }
    } 
    
    function deleteAutomation(automationName) {

        console.log('Deleting',automationName,automations)
        delete automations[automationName]

        fetch(serverurl+'/del/logic/automation/'+automationName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([])
            })
            .then(setAutomations(automations));
    } 
        
    function runAutomation(name) {
        var auto=deviceByEndpointId('logic:activity:'+name)
        auto.SceneController.directive('Activate')
    }

    function newAutomation() {
        applyBackPage('AutomationsLayout',{})
        applyLayoutCard('AutomationLayout', {'noBottom':true})        
    }
    
    function switchToSchedule() {
        applyBackPage('AutomationsLayout',{})
        applyLayoutCard('SchedulesLayout', {})
    }

    return (    
        <React.Fragment>
            <GridSection name={"Favorites"} >
            { Object.keys(automations).sort().map(automation => 
                ( automations[automation].favorite ?
                    <AutomationItem favorite={automations[automation].favorite} select={selectAutomation} edit={editing} triggerCount={automations[automation].triggerCount } actionCount={automations[automation].actionCount} conditionCount={automations[automation].conditionCount } name={automation} delete={deleteAutomation} run={runAutomation} key={ automation+'-reg' } />
                    :null
                )
            )}
            </GridSection>
            <GridSection name={"Other Automations"} secondary={
                <>
                    <IconButton onClick={ () => newAutomation() } className={classes.button }>
                        <AddIcon fontSize="small" />
                    </IconButton>
                        { Object.keys(automations).length>0 &&
                        <IconButton onClick={ () => { setRemove(!remove); }} className={classes.button }>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        }
                    <IconButton onClick={ () => switchToSchedule() } className={classes.button }>
                        <ScheduleIcon fontSize="small" />
                    </IconButton>
                </>
            }>

            { Object.keys(automations).sort().map(automation => 
                ( !automations[automation].favorite ?
                    <AutomationItem favorite={automations[automation].favorite} select={selectAutomation} edit={remove} triggerCount={automations[automation].triggerCount } actionCount={automations[automation].actionCount} conditionCount={automations[automation].conditionCount } name={automation} delete={deleteAutomation} run={runAutomation} key={ automation+'-reg' } />
                    :null
                )
            )}

            { adding ? 
                <AutomationAdd add={addAutomation} />
            : null }
            </GridSection>
        </React.Fragment>
    )
};