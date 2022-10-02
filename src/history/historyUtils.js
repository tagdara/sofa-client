import { tokenFetch } from 'network/tokenFetch'

export const getHistoryForDevice = async (dev, prop, page) => {
        
    // Requests the history for a specific device and property.  It allows for pagination since the data could be very
    // large.  This requires the Influx adapter in order to see history.
    var url = "/list/history/history/" + dev + "/" + prop
    if (page) { url = url + "/" + page }
    return tokenFetch(url)
}

export const getChangeTimesForDevices = async (val,devs) => {
        
    return await tokenFetch("/list/history/last/"+val, devs )
}

