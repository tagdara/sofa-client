import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';

import AutomationSave from "automation/AutomationSave"
import AutomationHeader from "automation/AutomationHeader"
import AutomationColumn from "automation/AutomationColumn"
import useLoginStore from 'store/loginStore'
import useLayoutStore from 'store/layoutStore'

import { isFavorite, makeFavorite } from 'store/deviceHelpers'
import { selectPage } from 'store/layoutHelpers'

export default function AutomationLayout(props) {

    const serverUrl = "https://"+window.location.hostname;
    const accessToken = useLoginStore(state => state.access_token)
    const [automation, setAutomation] = useState({})
    const [actions, setActions] = useState([])
    const [conditions, setConditions] = useState([])
    const [triggers, setTriggers] = useState([])
    const [schedules, setSchedules] = useState([])
    const [gotReturn,setGotReturn] = useState(false)
    const [saved, setSaved] = useState(true)
    const [title, setTitle] = useState("")
    const isMobile = useLayoutStore( state => state.isMobile)

    useEffect(() => {
        if (props.endpointId!==undefined) {
            loadJSONAutomation()
        } else {
            console.log('This is a blank automation.')
        }
    // eslint-disable-next-line
    }, [ props.name, props.item, gotReturn, props.type ]);

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
        
        setTitle(newauto.name)
        
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

    const loadJSONAutomation = async () => {
        const headers = { authorization : accessToken }
        const response = await fetch(serverUrl + "/list/logic/automation/"+props.endpointId, { headers: headers })
        var result = await response.json()
        loadAutomation(result)
    }


    function saveType(itemtype, items) {
        console.log('savetype',itemtype,items)
        if (itemtype==='title') {
            setTitle(items)
        } else if (itemtype==='action') {
            setActions(items)
        } else if (itemtype==='trigger') {
            setTriggers(items)
        } else if (itemtype==='condition') {
            console.log('setting conditions', items)
            setConditions(items)
        } else if (itemtype==='schedule') {
            setSchedules(items)
        }
        setSaved(false)
    }
    
    const newSaveAutomation = async () => {
        const headers = { authorization : accessToken }
        const body = {"name": title, "conditions": conditions, "actions": actions, "triggers":triggers, "schedules": schedules}
        const response = await fetch(serverUrl+"/save/logic/automation/"+props.endpointId, { headers: headers, method: "post", body: JSON.stringify(body)})
        await response.json()
        setSaved(true)
    }
    
    function goBack() {
        selectPage('AutomationsLayout')
    }


    return (
        <Grid container item spacing={1} xs={isMobile ? 12 : 9} >
            <AutomationHeader endpointId={props.endpointId} name={title} save={saveType} favorite={isFavorite('logic:activity:'+props.name)} makeFavorite={makeFavorite} automation={automation} />
            <AutomationColumn items={schedules} saved={saved} save={saveType} automationName={props.name} name={"Schedules"} itemModule={'automationSchedule'} itemtype={"schedule"} />
            <AutomationColumn items={triggers} saved={saved} save={saveType} automationName={props.name} name={"Triggers"} selector={'DevicePropertyLayout'} itemModule={'AutomationTrigger'} itemtype={"trigger"} />
            <AutomationColumn items={conditions} saved={saved} save={saveType} automationName={props.name} name={"Conditions"} selector={'DevicePropertyLayout'} itemModule={'AutomationCondition'} itemtype={"condition"} />
            <AutomationColumn items={actions} saved={saved} save={saveType} automationName={props.name} name={"Actions"} selector={'DeviceDirectiveLayout'} itemModule={'AutomationAction'} itemtype={"action"} />
            <AutomationSave name={title} saved={saved} save={newSaveAutomation} goBack={goBack} />
        </Grid>
    )
    
};
