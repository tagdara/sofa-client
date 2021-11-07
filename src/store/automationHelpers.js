
import useLoginStore from 'store/loginStore'

const serverUrl = "https://"+window.location.hostname;
const automationsUrl = serverUrl + "/list/logic/automations"

export const loadAutomations = async () => {
        const accessToken = useLoginStore.getState().access_token;
        console.log('lja', accessToken)
        const headers = { authorization : accessToken }
        const response = await fetch(automationsUrl, { headers: headers })
        var webResult = await response.json()
        console.log('automations?', accessToken , webResult)
        var result = fixAutomations(webResult)
        return result
    }

function fixAutomations(autos) {

    var sections=['actions','schedules','triggers','conditions'] 
    
    //for (var auto in autos) {
    for (var i = 0; i < autos.length; i++) {
        for (var j = 0; j < sections.length; j++) {
            if (!autos[i].hasOwnProperty(sections[j])) {
                console.log('warning', autos[i], 'does not have a',sections[j],'entry')    
                autos[i][sections[j]]=[]
            }
        }
    }
    return autos
}
