
import useLoginStore from 'store/loginStore'

const serverUrl = useLoginStore.getState().server_url
const activitiesUrl = serverUrl + "/list/logic/activities"
const scheduleUrl = serverUrl + "/list/logic/schedule"

export const loadActivities = async () => {
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(activitiesUrl, { headers: headers })
    var webResult = await response.json()
    console.log('webResult', webResult)
    // TODO/CHEESE - need a better way to parse a result for ErrorResponse instead of the expected result
    // and make that uniform across all loaders in order to prevent react crashes
    if (webResult.hasOwnProperty('event') && webResult.event.header.name === "ErrorResponse") {
        return []
    }
    var result = fixActivities(webResult)
    return result
}

export const loadSchedule = async () => {
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(scheduleUrl, { headers: headers })
    return await response.json()
}

function fixActivities(activities) {

    var sections=['actions', 'schedules', 'triggers', 'conditions'] 
    if (!Array.isArray(activities)) { 
        console.log('activities object is not a list - returning empty list', activities)
        return []
    }
    //for (var auto in autos) {
    for (var i = 0; i < activities.length; i++) {
        for (var j = 0; j < sections.length; j++) {
            if (!activities[i].hasOwnProperty(sections[j])) {
                //console.log('warning', activities[i], 'does not have a', sections[j], 'entry')    
                activities[i][sections[j]]=[]
            }
        }
    }
    return activities
}

export const deleteActivity = async endpointId => {

    console.log('Deleting Activity', endpointId)
    // TODO/CHEESE - Activities are listed by name, but the delete command now uses endpoint ids
    // This all needs to be sorted out

    const activities = await loadActivities()
    for (var id in activities) {
        if (activities[id].endpointId===endpointId) {
            console.log('Deleting Activity', endpointId, id)
            const accessToken = useLoginStore.getState().access_token;
            const headers = { authorization : accessToken }
            const body = []
            const response = await fetch(serverUrl + "/del/logic/activity/"+endpointId, { headers: headers, method: "post", body: JSON.stringify(body)})
            
            return await response.json()
        } 
    }
    console.log('did not find', endpointId, 'in', activities)
    return undefined
} 