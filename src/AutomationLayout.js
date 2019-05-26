import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import AutomationSave from "./automation/automationSave"
import AutomationTitle from "./automation/automationTitle"
import AutomationDetails from "./automation/automationDetails"

import AutomationColumn from "./AutomationColumn"
import ToggleButton from './ToggleButton'
import GridBreak from './GridBreak';
import FavoriteIcon from '@material-ui/icons/Favorite';

function AutomationLayout(props) {

    const [automation, setAutomation] = useState({})
    const [favorite, setFavorite] = useState(false)
    const [actions, setActions] = useState([])
    const [conditions, setConditions] = useState([])
    const [triggers, setTriggers] = useState([])
    const [schedules, setSchedules] = useState([])
    const [edit,setEdit] = useState(false)
    const [gotReturn,setGotReturn] = useState(false)
    const [saved, setSaved] = useState(true)
    const [title, setTitle] = useState(props.name)

    useEffect(() => {
        getAutomation();
    }, []);
    
    function checkCallbackItems(itemtype) {
        if (!gotReturn && props.type==itemtype && props.item) {
            setGotReturn(true)
            return props.item
        }
    }

    function getAutomation() {
  	    fetch('/list/logic/automation/'+props.name)
 		    .then(result=>result.json())
            .then(result=>loadAutomation(result));
    }
    
    function loadAutomation(newauto) {
        var newactions=[]
        var changes=false
        
        setAutomation(newauto)
        
        if (newauto.hasOwnProperty('favorite')) {
            setFavorite(newauto['favorite'])
        } else {
            setFavorite(false)
        }
        
        if (newauto.hasOwnProperty('actions')) {
            newactions=newauto['actions']
        } 
        
        var addaction=checkCallbackItems('action')
        if (addaction) {
            newactions=[...newactions,addaction]
            saveType('action',newactions)
        } else {
            setActions(newactions)
        }
        
        var newconditions=[]
        if (newauto.hasOwnProperty('conditions')) {
            newconditions = newauto['conditions']
        } 
        var addcondition=checkCallbackItems('condition')
        if (addcondition) {
            newconditions=[...newconditions,addcondition]
            saveType('condition',newconditions)
        } else {
            setConditions(newconditions);
        }
        
        var newtriggers=[]
        if (newauto.hasOwnProperty('triggers')) {
            newtriggers=newauto['triggers']
        }
        var addtrigger=checkCallbackItems('trigger')
        if (addtrigger) {
            newtriggers=[...newtriggers, addtrigger]
            saveType('trigger',newtriggers)
        } else {
            setTriggers(newtriggers);
        }
        
        var newschedules=[]
        if (newauto.hasOwnProperty('schedules')) {
            newschedules=newauto['schedules']
        }
        var addschedule=checkCallbackItems('schedule')
        if (addschedule) {
            newschedules=[...newschedules, addschedule]
            saveType('schedule', newschedules)
        } else {
            setSchedules(newschedules);
        }
        
        if (changes) {
            setSaved(false)
            //saveAutomation(newactions, newconditions, newtriggers, newschedules)
        }
    }
       
    function runAutomation(name) {
        props.sendAlexaCommand(name, 'logic:activity:'+name, 'SceneController', 'Activate')
    }
    
    function saveType(itemtype, items) {

        if (itemtype=='title') {
            setTitle(items)
        } else if (itemtype=='favorite') {
            setFavorite(items)
        } else if (itemtype=='action') {
            setActions(items)
        } else if (itemtype=='trigger') {
            setTriggers(items)
        } else if (itemtype=='condition') {
            setConditions(items)
        } else if (itemtype=='schedule') {
            setSchedules(items)
        }
        setSaved(false)
        //saveAutomation( newactions, newconditions, newtriggers, newschedules, newfavorite)
    }
    
    function saveAutomation(newactions, newconditions, newtriggers, newschedules, newfavorite) {
        
        fetch('/save/logic/automation/'+props.name, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"conditions": newconditions, "actions": newactions, "triggers": newtriggers, "schedules": newschedules, "favorite": newfavorite})
            })
                .then(result =>setActions(newactions))
                .then(result =>setConditions(newconditions))
                .then(result =>setTriggers(newtriggers))
                .then(result =>setSchedules(newschedules))
                .then(result =>setFavorite(newfavorite))
    }

    function newSaveAutomation() {
        
        fetch('/save/logic/automation/'+title, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"conditions": conditions, "actions": actions, "triggers":triggers, "schedules": schedules, "favorite": favorite})
            })
                .then(setSaved(true))
    }

    
    function saveFavorite(newfavorite) {
        saveType('favorite',newfavorite)
    }

    function saveStub(a,c,t) {
        console.log('Blocked Save',a,c,t)
    }
    
    function goBack() {
        props.applyLayoutCard('AutomationsLayout')
    }

    return (    
        <React.Fragment>
            <AutomationTitle name={title} save={saveType} >
                <ToggleButton buttonState={favorite? "on": "off"} onClick={ () => saveFavorite(!favorite) }>
                    <FavoriteIcon fontSize="small" />
                </ToggleButton>
            </AutomationTitle>
            <AutomationDetails automation={automation} />
            <AutomationColumn items={schedules} saved={saved} save={saveType} automationName={props.name} name={"Schedules"} itemModule={'automationSchedule'} itemtype={"schedule"} />
            <AutomationColumn items={triggers} saved={saved} save={saveType} automationName={props.name} name={"Triggers"} selector={'DevicePropertyLayout'} itemModule={'AutomationTrigger'} itemtype={"trigger"} />
            <AutomationColumn items={conditions} saved={saved} save={saveType} automationName={props.name} name={"Conditions"} selector={'DevicePropertyLayout'} itemModule={'AutomationCondition'} itemtype={"condition"} />
            <AutomationColumn items={actions} saved={saved} save={saveType} automationName={props.name} name={"Actions"} selector={'DeviceDirectiveLayout'} itemModule={'AutomationAction'} itemtype={"action"} />
            <AutomationSave name={title} saved={saved} save={newSaveAutomation} goBack={goBack} />
        </React.Fragment>
    )
};

export default withData(withLayout(AutomationLayout));