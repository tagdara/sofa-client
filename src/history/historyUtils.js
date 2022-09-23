import { tokenFetch } from 'network/tokenFetch'

export const getHistoryForDevice = async (dev, prop, page) => {
        
    // Requests the history for a specific device and property.  It allows for pagination since the data could be very
    // large.  This requires the Influx adapter in order to see history.
    var url = "/list/influx/history/" + dev + "/" + prop
    if (page) { url = url + "/" + page }
    return tokenFetch(url)
}

export const getChangeTimesForDevices = async (val,devs) => {
        
    // Requests the last time the value changed for a set of devices.  This requires the Influx adapter
    // in order to see history.

    //console.log('gctfd',val,devs)
    //var endpointList=[]
    //for (var i = 0; i < devs.length; i++) {   
    //   endpointList.push(devs[i].endpointId)
    //}
    function checkJSON(data) {
        if (typeof(data)==='string') {
            return JSON.parse(data)
        } else {
            return data
        }
    }

    const response = await tokenFetch("/list/influx/last/"+val, devs )
    var result = await response.json()
    return checkJSON(result)
}

