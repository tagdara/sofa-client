import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AutomationItem from './automation/automationItem';
import AutomationAdd from './automation/automationAdd';
import IconButton from '@material-ui/core/IconButton';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import GridBreak from './GridBreak';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

function AutomationsLayout(props) {

    const classes = useStyles();
    const [automations, setAutomations] = useState({})
    const [adding, setAdding] = useState(false)
    const [editing, setEditing] = useState(false)
    const [remove, setRemove] = useState(false)
    const [favoriteMode, setFavoriteMode] = useState(false)

    useEffect(() => {
        getAutomations()
    }, []);

    function getAutomations() {
        fetch('/list/logic/automationlist')
            .then(result=>result.json())
            .then(result=>setAutomations(result))
    }
    
    function selectAutomation(automation) {
        props.setBack('AutomationsLayout',{})
        props.setLayoutCard('AutomationLayout', {'name':automation, 'noBottom':true } )
    }    
    
    function addAutomation(automationName) {

        if (automations.hasOwnProperty(automationName)) {
            console.log('An automation with that name already exists',automationName)
            return false
        } else {
            var automations=automations
            automations[automationName]={'actionCount': 0, 'conditionCount': 0}
            console.log('Automations will be', automations)
    
            fetch('/add/logic/automation/'+automationName, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([])
                })
                .then(setAutomations(automations))
        }
    } 
    
    function deleteAutomation(automationName) {

        console.log('Deleting',automationName,automations)
        delete automations[automationName]

        fetch('/del/logic/automation/'+automationName, {
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
        props.sendAlexaCommand(name, 'logic:activity:'+name, 'SceneController', 'Activate')
    }

    function newAutomation() {
        props.setBack('AutomationsLayout',{})
        props.setLayoutCard('AutomationLayout', {'noBottom':true})        
    }
    
    function switchToSchedule() {
        props.setBack('AutomationsLayout',{})
        props.setLayoutCard('SchedulesLayout', {})
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Favorites"}/>
            { Object.keys(automations).sort().map(automation => 
                ( automations[automation].favorite ?
                    <AutomationItem favorite={automations[automation].favorite} select={selectAutomation} edit={editing} triggerCount={automations[automation].triggerCount } actionCount={automations[automation].actionCount} conditionCount={automations[automation].conditionCount } name={automation} delete={deleteAutomation} run={runAutomation} key={ automation+'-reg' } />
                    :null
                )
            )}
            <GridBreak label={"Other Automations"}>
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
            </GridBreak>

            { Object.keys(automations).sort().map(automation => 
                ( !automations[automation].favorite ?
                    <AutomationItem favorite={automations[automation].favorite} select={selectAutomation} edit={remove} triggerCount={automations[automation].triggerCount } actionCount={automations[automation].actionCount} conditionCount={automations[automation].conditionCount } name={automation} delete={deleteAutomation} run={runAutomation} key={ automation+'-reg' } />
                    :null
                )
            )}

            { adding ? 
                <AutomationAdd add={addAutomation} />
            : null }
        </React.Fragment>
    )

};

export default withData(AutomationsLayout);