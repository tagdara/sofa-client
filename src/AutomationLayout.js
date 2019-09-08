import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import AutomationSave from "./automation/automationSave"
import AutomationHeader from "./automation/automationHeader"
import AutomationColumn from "./AutomationColumn"

export default function AutomationLayout(props) {

    const [automation, setAutomation] = useState({})
    const [favorite, setFavorite] = useState(false)
    const [actions, setActions] = useState([])
    const [conditions, setConditions] = useState([])
    const [triggers, setTriggers] = useState([])
    const [schedules, setSchedules] = useState([])
    const [gotReturn,setGotReturn] = useState(false)
    const [saved, setSaved] = useState(true)
    const [title, setTitle] = useState(props.name)
    const serverurl="https://"+window.location.hostname;
    const { applyLayoutCard } = useContext(LayoutContext);

    useEffect(() => {
        function checkCallbackItems(itemtype) {
            if (!gotReturn && props.type===itemtype && props.item) {
                setGotReturn(true)
                return props.item
            }
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

        fetch(serverurl+'/list/logic/automation/'+props.name)
            .then(result=>result.json())
            .then(result=>loadAutomation(result));
    }, [props.name, props.item, gotReturn, props.type, serverurl]);



    function saveType(itemtype, items) {

        if (itemtype==='title') {
            setTitle(items)
        } else if (itemtype==='favorite') {
            setFavorite(items)
        } else if (itemtype==='action') {
            setActions(items)
        } else if (itemtype==='trigger') {
            setTriggers(items)
        } else if (itemtype==='condition') {
            setConditions(items)
        } else if (itemtype==='schedule') {
            setSchedules(items)
        }
        setSaved(false)
    }
    
    function newSaveAutomation() {
        
        fetch(serverurl+'/save/logic/automation/'+title, {
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
    
    function goBack() {
        applyLayoutCard('AutomationsLayout')
    }

    return (    
        <React.Fragment>
            <AutomationHeader name={title} save={saveType} favorite={favorite? "on": "off"} saveFavorite={saveFavorite} automation={automation} />
            <AutomationColumn items={schedules} saved={saved} save={saveType} automationName={props.name} name={"Schedules"} itemModule={'automationSchedule'} itemtype={"schedule"} />
            <AutomationColumn items={triggers} saved={saved} save={saveType} automationName={props.name} name={"Triggers"} selector={'DevicePropertyLayout'} itemModule={'AutomationTrigger'} itemtype={"trigger"} />
            <AutomationColumn items={conditions} saved={saved} save={saveType} automationName={props.name} name={"Conditions"} selector={'DevicePropertyLayout'} itemModule={'AutomationCondition'} itemtype={"condition"} />
            <AutomationColumn items={actions} saved={saved} save={saveType} automationName={props.name} name={"Actions"} selector={'DeviceDirectiveLayout'} itemModule={'AutomationAction'} itemtype={"action"} />
            <AutomationSave name={title} saved={saved} save={newSaveAutomation} goBack={goBack} />
        </React.Fragment>
    )
};
