import React, { Suspense } from 'react';
import { Button } from '@mantine/core';
import useActivityEditorStore from 'store/activityEditorStore'
import useLoginStore from 'store/loginStore'
import { hasCapability } from './deviceHelpers';

const serverUrl = useLoginStore.getState().server_url
const activityUrl = serverUrl + "/list/logic/activity/" // +props.endpointId
const saveUrl = serverUrl + "/save/logic/activity/" // +props.endpointId
const addUrl = serverUrl + "/add/logic/activity" // +props.endpointId


const checkItemNotReady = (section, item) => {
    if (!item.endpointId || item.endpointId === undefined) { 
        console.log('no endpointId', section)
        return true
    }
    if (section === "conditions") {
        if  (!item.operator || item.operator === undefined) {
            console.log('condition without operator', item)
            return true
        }
    }
    if (section === "actions") {
        if  (!item.controller || item.controller === undefined) {
            console.log('action without controller', item)
            return true
        }
        if  (!item.command || item.command === undefined) {
            console.log('action without command', item)
            return true
        }
    }
    return false
}

const checkSectionNotReady = (section, data) => {
    if (!data || data.length < 1) { console.log('empty section', section); return false}
    const result = data.filter( item => checkItemNotReady(section, item) )
    if (result.length > 0) { console.log(section,'not ready')}
    return (result.length > 0 )
}

export const okToSave = () => {
    console.log('-------- checking ok to save')
    const sections = [ "actions", "conditions", "triggers"]
    const saved = useActivityEditorStore.getState().saved
    if (saved) { console.log('already saved'); return false }
    const activity = useActivityEditorStore.getState().activity
    if (!activity.name) { console.log('no name in activity', activity); return false }
    const results = sections.filter( section => checkSectionNotReady(section, activity[section]) )
    return (results.length === 0)
}


export const loadActivity = async (endpointId) => {
    // loadJSONAutomation
    useActivityEditorStore.setState({name: undefined, endpointId: endpointId, activity: {}, saved: false}, true)
    if (endpointId) {
        const accessToken = useLoginStore.getState().access_token;
        const headers = { authorization : accessToken }
        console.log('attempting to get activity', endpointId)
        const response = await fetch(activityUrl + endpointId, { headers: headers })
        const result = await response.json()
        console.log('result', result)
        useActivityEditorStore.setState({endpointId: endpointId, activity: result, saved: true}, true)
    }
}

export const newActivity = () => {
    useActivityEditorStore.setState({ activity: {}, saved: false, endpointId: undefined }, true)
}

export const modifyActivityJson = data => {
    const endpointId = useActivityEditorStore.getState().endpointId;
    if (data.updated_src) {
        useActivityEditorStore.setState({ activity: data.updated_src, endpointId: endpointId, saved: false }, true)
    }
}

export const saveActivity = async () => {
    const accessToken = useLoginStore.getState().access_token;
    const endpointId = useActivityEditorStore.getState().endpointId
    const activity = useActivityEditorStore.getState().activity
    const headers = { authorization : accessToken }
    const body = { ...activity, endpointId : endpointId }
    const response = await fetch(saveUrl + endpointId, { headers: headers, method: "post", body: JSON.stringify(body)})
    const result = await response.json()
    console.log('result', result)
    useActivityEditorStore.setState({ saved: true })
}

export const addActivity = async () => {
    const accessToken = useLoginStore.getState().access_token;
    const activity = useActivityEditorStore.getState().activity
    const headers = { authorization : accessToken }
    const body = { ...activity }
    const response = await fetch(addUrl, { headers: headers, method: "post", body: JSON.stringify(body)})
    const result = await response.json()
    console.log('created', result.endpointId, 'and refreshing', typeof result, result)
    useActivityEditorStore.setState({ endpointId: result.endpointId, activity: result, saved: true })
}


export const removeActivityItem = (section, index) => {
    // section should be the category - actions, conditions, triggers, schedules
    console.log('deleting item', index, 'from', section)
    const activity = useActivityEditorStore.getState().activity
    const items = activity[section]
    var remaining = [...items]
    remaining.splice(index, 1);
    useActivityEditorStore.setState({ saved: false, activity: { ...activity, [section]: [ ...remaining] }})
}

export const updateActivityItem = (section, index, item) => {
    // section should be the category - actions, conditions, triggers, schedules
    const activity = useActivityEditorStore.getState().activity

    if (activity[section]) {
        const items = activity[section]
        var updatedItems = [...items]
        updatedItems[index] = item
    } else {
        console.log('This section does not exist to update', section)
        return 
    }

    useActivityEditorStore.setState({ saved: false, activity: { ...activity, [section]: updatedItems }})
}

export const addActivityItem = (section, item) => {
    // section should be the category - actions, conditions, triggers, schedules
    const activity = useActivityEditorStore.getState().activity
    var updatedItems = [ item ]
    console.log('updating', section, updatedItems)
    if (activity[section]) {
        const items = activity[section]
        console.log('old', items)
        updatedItems = [...items, ...updatedItems]
    }
    useActivityEditorStore.setState({ saved: false, activity: { ...activity, [section]: updatedItems }})
}

export const moveActivityItemUp = (section, index) => {
    if (index-1>=0) {
        const activity = useActivityEditorStore.getState().activity
        const items = activity[section]
        console.log('moving up item', index, items[index])
        var updatedItems = [...items]
        var element = updatedItems[index];
        updatedItems.splice(index, 1);
        updatedItems.splice(index-1, 0, element);
        console.log('moved up item', updatedItems[index-1], updatedItems)
        useActivityEditorStore.setState({ saved: false, activity: { ...activity, [section]: updatedItems }})
    }
}

export const moveActivityItemDown = (section, index) => {
    const activity = useActivityEditorStore.getState().activity
    const items = activity[section]
    if (index+1 <= items.length) {
        var updatedItems = [...items]
        var element = updatedItems[index];
        updatedItems.splice(index, 1);
        updatedItems.splice(index+1, 0, element);
        useActivityEditorStore.setState({ saved: false, activity: { ...activity, [section]: updatedItems }})
    }
}

export const activityDirective = (endpointId, controllerName, command, payload={}, cookie={}, instance)  => {
    // This is a fake directive that allows us to leverage existing device objects and save instead of launching
    //if (controllerName !== item.controller) { return false}

    // Need to refactor for zustand
    //props.save(props.index, {...item, controller:controllerName, command:command, instance: instance, value: payload})
}

//function directive (endpointId, controllerName, command, payload={}, cookie={}, instance) {
//    console.log('fake directive', controllerName, props.item.controller)
//    var itemController = props.item.controller
//    if (itemController.includes('.')) {
//        itemController = itemController.split('.')[1]
////    }
///    if (controllerName!==itemController) { return false}
//    props.save(props.index, {...props.item, controller:controllerName, command:command, instance: instance, value: payload})
//}


export const selectActivityDevice = (section, index, endpointId) => {
    console.log('selected new device', endpointId)
    const item = useActivityEditorStore.getState().activity[section][index]
    var updatedItem = { ...item, endpointId: endpointId }
    if (!hasCapability(endpointId, item.controller)) {
        updatedItem = { ...updatedItem, controller: undefined, value: undefined, instance: undefined, propertyName: undefined }
        if (item.type === "command") {
            updatedItem = { ...updatedItem, command: undefined }
        }
    }
    updateActivityItem(section, index, {...updatedItem})
}

export const shortTimeFormat = thisdate => {
    var longdate = new Date().toISOString().replace('Z','')
    
    if (thisdate) {
        longdate=thisdate
    }

    if (longdate.split(':').length>2) {
        longdate=longdate.split(':')[0]+":"+longdate.split(':')[1]
    }

    return longdate
}

function placeholder(modulename) {
    return <Button disabled>{modulename ? modulename : "Loading..."}</Button>
}

function errorBlock(modulename) {
    return <Button disabled>{modulename ? modulename : "Error"}</Button>
}

export const loadPropertyModule = (name) => {
    let propertyModule = React.lazy(() => { 
        try { 
            return import('device-model/property/' + name ).catch(() => ({ default: () => errorBlock(name) }))
        }
        catch {
            return <Button disabled>{name ? name : "Not available"}</Button>
        }
    })
    return propertyModule
}

export const renderSuspensePropertyModule = ( moduleName, propertyModule, props, key ) => {
    
    if (propertyModule === null) { return null }
    if (propertyModule === undefined ) { return placeholder(moduleName) }
    let Module = propertyModule

    return  (
        <Suspense key={ key } fallback={ placeholder() }>
            <Module {...props} />
        </Suspense>
    )
}