import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';

import AutomationColumn from "./AutomationColumn"
import AutomationRow from "./AutomationRow"

import GridBreak from './GridBreak';

function AutomationLayout(props) {

    const [automation, setAutomation] = useState({})
    const [actions, setActions] = useState([])
    const [conditions, setConditions] = useState([])
    const [triggers, setTriggers] = useState([])
    const [schedules, setSchedules] = useState([])
    const [edit,setEdit] = useState(false)
    const [gotReturn,setGotReturn] = useState(false)

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
        props.setBack('AutomationsLayout', {} )
        console.log('Retrieving automation',props.name)
  	    fetch('/list/logic/automation/'+props.name)
 		    .then(result=>result.json())
            .then(result=>loadAutomation(result));
    }
    
    function loadAutomation(automation) {
        var newactions=[]
        var changes=false
        if (automation.hasOwnProperty('actions')) {
            newactions=automation['actions']
        } 
        
        var addaction=checkCallbackItems('action')
        if (addaction) {
            newactions=[...newactions,addaction]
            changes=true
        }
        setActions(newactions)
        
        var newconditions=[]
        if (automation.hasOwnProperty('conditions')) {
            newconditions = automation['conditions']
        } 
        var addcondition=checkCallbackItems('condition')
        if (addcondition) {
            newconditions=[...newconditions,addcondition]
            changes=true
        }
        setConditions(newconditions);
        
        var newtriggers=[]
        if (automation.hasOwnProperty('triggers')) {
            newtriggers=automation['triggers']
        }
        var addtrigger=checkCallbackItems('trigger')
        if (addtrigger) {
            newtriggers=[...newtriggers, addtrigger]
            changes=true
        }
        setTriggers(newtriggers);
        
        var newschedules=[]
        if (automation.hasOwnProperty('schedules')) {
            newschedules=automation['schedules']
        }
        var addschedule=checkCallbackItems('schedule')
        if (addschedule) {
            newschedules=[...newschedules, addschedule]
            changes=true
        }
        setSchedules(newschedules);
       
        if (changes) {
            saveAutomation(newactions, newconditions, newtriggers, newschedules)
        }
    }
       
    function runAutomation(name) {
        props.sendAlexaCommand(name, 'logic:activity:'+name, 'SceneController', 'Activate')
    }
    
    function saveType(itemtype, items) {

        if (itemtype=='action') {
            var newactions=items
        } else {
            var newactions=actions
        }
        
        if (itemtype=='triggen') {
            var newtriggers=items
        } else {
            var newtriggers=triggers
        }

        if (itemtype=='condition') {
            var newconditions=items
        } else {
            var newconditions=conditions
        }
        
        if (itemtype=='schedule') {
            var newschedules=items
        } else {
            var newschedules=schedules
        }
        
        saveAutomation( newactions, newconditions, newtriggers, newschedules)
    }
    
    function saveAutomation(newactions, newconditions, newtriggers, newschedules) {
        
        fetch('/save/logic/automation/'+props.name, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"conditions": newconditions, "actions": newactions, "triggers": newtriggers})
            })
                .then(result =>setActions(newactions))
                .then(result =>setConditions(newconditions))
                .then(result =>setTriggers(newtriggers))
                .then(result =>setTriggers(newschedules))

    } 

    function saveStub(a,c,t) {
        console.log('Blocked Save',a,c,t)
    }

    return (    
        <React.Fragment>
            <GridBreak label={props.name} />
            <AutomationRow items={schedules} save={saveType} automationName={props.name} name={"Schedules"} selector={'ScheduleLayout'} itemModule={'automationSchedule'} itemtype={"schedule"} />
            <AutomationColumn items={triggers} save={saveType} automationName={props.name} name={"Triggers"} selector={'DevicePropertyLayout'} itemModule={'automationTrigger'} itemtype={"trigger"} />
            <AutomationColumn items={conditions} save={saveType} automationName={props.name} name={"Conditions"} selector={'DevicePropertyLayout'} itemModule={'automationCondition'} itemtype={"condition"} />
            <AutomationColumn items={actions} save={saveType} automationName={props.name} name={"Actions"} selector={'DeviceDirectiveLayout'} itemModule={'automationAction'} itemtype={"action"} />
        </React.Fragment>
    )

};

export default withData(AutomationLayout);