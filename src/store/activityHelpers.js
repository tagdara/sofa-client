
import useLoginStore from 'store/loginStore'

const serverUrl = "https://"+window.location.hostname;
const activitiesUrl = serverUrl + "/list/logic/activities"

export const loadActivities = async () => {
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(activitiesUrl, { headers: headers })
    var webResult = await response.json()
    console.log('activities?', accessToken , webResult)
    var result = fixActivities(webResult)
    return result
}

function fixActivities(activities) {

    var sections=['actions', 'schedules', 'triggers', 'conditions'] 
    
    //for (var auto in autos) {
    for (var i = 0; i < activities.length; i++) {
        for (var j = 0; j < sections.length; j++) {
            if (!activities[i].hasOwnProperty(sections[j])) {
                console.log('warning', activities[i], 'does not have a', sections[j], 'entry')    
                activities[i][sections[j]]=[]
            }
        }
    }
    return activities
}
