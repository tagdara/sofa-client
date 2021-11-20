import useDeviceStore from 'store/deviceStore'
import useRegisterStore from 'store/registerStore'
import useLoginStore from 'store/loginStore'
import useUserStore from 'store/userStore'

const serverUrl = "https://"+window.location.hostname;
const eventSources={ 'DoorbellEventSource': { "doorbellPress": {} }} 

export const register = useRegisterStore.getState().add
export const unregister = useRegisterStore.getState().remove


export const compareState = (oldData, newData) => {
    for (var item in oldData) {
        if (!oldData[item].hasOwnProperty('last_update')) { console.log('state no last update', oldData[item])}
        if ((oldData[item].last_update !== newData[item].last_update)) { 
            //console.log(item, 'last update mismatch', oldData[item].last_update, newData[item].last_update )
            return false
        }
    }
    for (var dataItem in newData) {
        if (!oldData[dataItem]) {
            //console.log('missing state mismatch')
            return false
        }
    }    
    return true
}

export const compareDevice = (oldData, newData) => {
    for (var item in oldData) {
        if ((oldData[item].friendlyName !== newData[item].friendlyName)) { 
            //console.log('fn mismatch')
            return false
        }
    }
    for (var dataItem in newData) {
        if (!oldData[dataItem]) {
            //console.log('dev new mismatch')
            return false
        }
    }    
    return true
}


export function endpointIdsByFriendlyName(names) {
    var devices = useDeviceStore.getState().devices       
    var result = []    
    for (var id in devices) {
        if (names.includes(devices[id]['friendlyName'])) {
            result.push(id)
        } 
    }
    return result
}


export const getInputs = ( endpointId, exclude=[] ) => {
    var dev = useDeviceStore.getState().devices[endpointId]
    var choices = []        
    if (dev && dev.hasOwnProperty('capabilities')) {
        for (var k = 0; k < dev.capabilities.length; k++) {
            if (dev.capabilities[k].interface.endsWith('InputController')) {
                for (var j = 0; j < dev.capabilities[k].inputs.length; j++) {
                    choices.push(dev.capabilities[k].inputs[j].name)
                }
            }
        }
    } else {
        console.log('No inputs for ', dev)
    }
    return choices
}

export const getController = (endpointId, name) => {
    var dev = useDeviceStore.getState().devices[endpointId]
    if (dev!==undefined) {
        for (var j = 0; j < dev.capabilities.length; j++) {
            if (dev.capabilities[j].interface.endsWith("."+name)) {
                return dev.capabilities[j]
            }
            if (dev.capabilities[j].hasOwnProperty('instance') && (dev.capabilities[j].instance === name || dev.capabilities[j].instance.endsWith("."+name))) {
                return dev.capabilities[j]
            }
        }
    }
    return undefined
}

export const getModeControllers = (endpointId) => {

    var dev = endpointId
    var results = []
    if (typeof(dev)=='string') {
        dev = useDeviceStore.getState().devices[dev]
    }   

    if (!dev) { return undefined }

    // should use a filter here instead
    for (var k = 0; k < dev.capabilities.length; k++) {
        if (dev.capabilities[k].interface.endsWith('ModeController')) {
            results.push(dev.capabilities[k])
        }
    }
    return results
}


export const getModeControllerFriendlyName = (endpointId, instance) => {

    const modeCapability = getController(endpointId, instance)
    if (!modeCapability) { return {} }
    return modeCapability.capabilityResources.friendlyNames[0].value.text

}

export const getSupportedModeList = (endpointId, instance) => {

    try {
        const modeCapability = getController(endpointId, instance)
        const supportedModes = modeCapability.configuration.supportedModes
        return supportedModes.map( mode => { return { name: mode.modeResources.friendlyNames[0].value.text, value: mode.value}} )
    }
    catch {
        console.log('could not get supported mode list for', endpointId, instance)
    }
    return []
}


export const getModes = (endpointId, exclude=[]) => {

    var dev = endpointId
    if (typeof(dev)=='string') {
        dev = useDeviceStore.getState().devices[dev]
    }    
    if (!dev) { return {} }
    var modes={}

    for (var k = 0; k < dev.capabilities.length; k++) {
        if (dev.capabilities[k].interface.endsWith('ModeController')) {
            var modeCapability = dev.capabilities[k]
            var supportedModes = modeCapability.configuration.supportedModes
            var modename=modeCapability.capabilityResources.friendlyNames[0].value.text
            if (!exclude.includes(modename)) {
                var modeChoices=[]
                modes[modename] = supportedModes.reduce(function(result, mode) {
                    return { ...result, [mode.value]: mode.modeResources.friendlyNames[0].value.text }
                }, modeChoices)
                //for (var j = 0; j < supportedModes.length; j++) {
                //    modechoices[supportedModes[j].value] = supportedModes[j].modeResources.friendlyNames[0].value.text
                //}
                //modes[modename]=[...modechoices]
            }
        }
    }
    return modes
}

export function sortByName(devlist) {
    var devices = useDeviceStore.getState().devices
    devlist.sort(function(a, b)  {
        var x = undefined
        var y = undefined
        try {
            if (typeof a === 'string') { 
                x = devices[a].friendlyName.toLowerCase()
            } else {
                x = a.friendlyName.toLowerCase()
            }
            if (typeof b === 'string') { 
                y = devices[b].friendlyName.toLowerCase()
            } else {
                y = b.friendlyName.toLowerCase()
            }
            return x < y ? -1 : x>y ? 1 : 0;
        }
        catch(error) {
            console.log('name sort error on', a, b, error)
        }
        return -1
    });    
    return devlist
}

export function hasDisplayCategory(endpointId, category) {
    var device = useDeviceStore.getState().devices[endpointId]
    return device.displayCategories.includes( category.toUpperCase() )
}

export function hasCapability(endpointId, controller) {
    var device = useDeviceStore.getState().devices[endpointId]
    var result = device.capabilities.filter(cap => cap.interface.endsWith(controller))
    return result.length > 0
}

export function deviceByEndpointId(endpointId) {
    return useDeviceStore.getState().devices[endpointId]       
}

export function deviceByFriendlyName(devname) {
    var devices = useDeviceStore.getState().devices           
    for (var id in devices) {
        if (devices[id]['friendlyName']===devname) {
            return devices[id]
        } 
    }
    return undefined
}

export function devicesByFriendlyName(devnames) {
    var devices = useDeviceStore.getState().devices
    var results = {}           
    for (var id in devices) {
        if (devnames.includes(devices[id]['friendlyName'])) {
            results[id] = devices[id]
        } 
    }
    return results
}

export function devicesByEndpointIds(endpointIds) {
    var devices = useDeviceStore.getState().devices
    var results = {}           
    for (var id in devices) {
        results[id]=devices[id]
    }
    return results
}
          
export const friendlyNameByEndpointId = endpointId => {
    var device = useDeviceStore.getState().devices[endpointId]  
    return device.friendlyName
}

export function endpointIdByFriendlyName(devname) {
    var devices = useDeviceStore.getState().devices           
    for (var id in devices) {
        if (devices[id]['friendlyName']===devname) {
            return devices[id].endpointId
        } 
    }
    return undefined
}

export const hasDescription = (endpointId, term) => {
    var device = useDeviceStore.getState().devices[endpointId]   
    return device.description.toLowerCase().includes(term.toLowerCase())
}

export const hasInstance = (endpointId, instance) => {
    var dev = useDeviceStore.getState().devices[endpointId]
    for (var k = 0; k < dev.capabilities.length; k++) {
        if (dev.capabilities[k].hasOwnProperty('instance') && dev.capabilities[k].instance.endsWith(instance)) {
            return true
        }
    }
    return false
  
}

export function endpointIdsByDisplayCategory(category) {
    var devices = useDeviceStore.getState().devices  
    var endpointIds = []         
    for (var id in devices) {
        if (devices[id].displayCategories.includes(category)) {
            endpointIds.push(devices[id].endpointId)
        } 
    }
    return endpointIds
}

export function filteredEndpointIdsByDisplayCategory(category, filter) {
    var devices = useDeviceStore.getState().devices  
    var endpointIds = []         
    filter = filter.toLowerCase()
    console.log('filter', category, filter)
    for (var id in devices) {
        if ((!category || devices[id].displayCategories.includes(category)) && (!filter || devices[id].friendlyName.toLowerCase().includes(filter)) ) {
            endpointIds.push(devices[id].endpointId)
        } 
    }
    return endpointIds
}

export const modeDisplayName = (endpointId, instance, value) => {

    var dev = useDeviceStore.getState().devices[endpointId]        
    for (var k = 0; k < dev.capabilities.length; k++) {
        if (dev.capabilities[k].hasOwnProperty('instance') && dev.capabilities[k].instance.endsWith(instance)) {
            try {
                const supportedModes = dev.capabilities[k].configuration.supportedModes
                for (var j = 0; j < supportedModes.length; j++) {
                    if (supportedModes[j].value === value) {
                        return supportedModes[j].modeResources.friendlyNames[0].value.text                     
                    }
                }
            }
            catch { console.log('could not get display value for', value) }
        }
    }
    return value
}

export const controllerForProperty = (endpointId, controllerProp) => {
    const controllerProperties = useDeviceStore.getState().controllerProperties
    if (endpointId) {
        var dev=deviceByEndpointId(endpointId)
        for (var es in eventSources) {
            if (eventSources[es].hasOwnProperty(controllerProp)) {
                return es
            }
        }
        for (var j = 0; j < dev.capabilities.length; j++) {
            if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                if (Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]).includes(controllerProp)) {
                    return dev.capabilities[j].interface.split('.')[1]
                }
            }
            if (dev.capabilities[j].hasOwnProperty('instance') && dev.capabilities[j].instance.split('.')[1]===controllerProp) {
                return dev.capabilities[j].interface.split('.')[1]
            }
        }
    }
    return undefined
}   

export const getControllerProperties = endpointId => {

    const controllerProperties = useDeviceStore.getState().controllerProperties
    var devprops=[]        
    if (endpointId) {
        var dev=deviceByEndpointId(endpointId)
        if (dev) {
            for (var j = 0; j < dev.capabilities.length; j++) {
                if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                    devprops=devprops.concat(Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]))
                }
                if (eventSources.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
                    devprops=devprops.concat( Object.keys( eventSources[dev.capabilities[j].interface.split('.')[1]]))
                }
            }
        }
    }
    return devprops
}    

export const getControllerInterface = (device, item)  => {

    if (device===undefined) { return undefined }
    if (device.hasOwnProperty('capabilities')) {
        for (var j = 0; j < device.capabilities.length; j++) {
            if (device.capabilities[j].interface.split('.')[1]===item.controller || device.capabilities[j].interface===item.controller || device.capabilities[j].interface.split('.')[1]===item.controller.split('.')[1]) {
                if (item.instance===undefined && device.capabilities[j].interface.instance===undefined) {
                    return device.capabilities[j]
                }
                if (item.hasOwnProperty('instance') && device.capabilities[j].hasOwnProperty('instance')) {
                    if (item.instance===device.capabilities[j].instance || item.instance===device.capabilities[j].instance.split('.')[1]) {
                        return device.capabilities[j]
                    }
                }               
            }
        }
    }
    console.log('failed get interface', device, item)
    return undefined
}

export const getDeviceProperties = dev => {

    const controllerProperties = useDeviceStore.getState().controllerProperties
    var devprops=[]        
    if (dev) {
        for (var j = 0; j < dev.capabilities.length; j++) {
            if (dev.capabilities[j].hasOwnProperty('instance')) {
                devprops=devprops.concat([dev.capabilities[j].instance.split('.')[1]])
            } else if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                devprops=devprops.concat(Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]))
            } else if (eventSources.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
                devprops=devprops.concat( Object.keys( eventSources[dev.capabilities[j].interface.split('.')[1]]))
            }
        }
    }
    return devprops
}

export const mapDeviceProperties = dev => {
        
    var devprops=[]     
    if (dev===undefined) { return undefined }

    const controllerProperties = useDeviceStore.getState().controllerProperties
     
    for (var j = 0; j < dev.capabilities.length; j++) {
        if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
            var cp=Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]])
            for (var k = 0; k < cp.length; k++) {
                devprops.push({'instance':dev.capabilities[j].instance, 'controller':dev.capabilities[j].interface.split('.')[1], 'property': cp[k]})
            }
            //devprops=devprops.concat(Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]))
        }
        if (eventSources.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
            var ep=Object.keys(eventSources[dev.capabilities[j].interface.split('.')[1]])
            for (var l = 0; l < ep.length; l++) {
                devprops.push({'instance':dev.capabilities[j].instance, 'controller':dev.capabilities[j].interface.split('.')[1], 'property': ep[l]})
            }
            //devprops=devprops.concat( Object.keys( eventSources[dev.capabilities[j].interface.split('.')[1]]))
        }
    }
    
    return devprops
}  


export const deviceDirectives = dev => {
    const directives = useDeviceStore.getState().directives
    if (dev===undefined) { return undefined }
    var dirs=[]
    if (dev.hasOwnProperty('capabilities')) {
        for (var j = 0; j < dev.capabilities.length; j++) {
            var shortIf=dev.capabilities[j].interface.split('.')[1]
            if (directives.hasOwnProperty(shortIf)) {
                var idirs=Object.keys(directives[shortIf])
                for (var i = 0; i < idirs.length; i++) {
                    if (dev.capabilities[j].hasOwnProperty('instance')) {
                        dirs.push({"directive":idirs[i], "controller":shortIf, "instance":dev.capabilities[j].instance})
                    } else {
                        dirs.push({"directive":idirs[i], "controller":shortIf, "instance":undefined})
                    }
                }
            }
        }
    }
    return dirs
}

export const isModeNonControllable = (dev, instance) => {
        
    if (typeof(dev)=='string') {
        dev = deviceByEndpointId(dev)
    }
    
    for (var k = 0; k < dev.capabilities.length; k++) {
        if (dev.capabilities[k].hasOwnProperty('instance') && dev.capabilities[k].instance.split('.')[1]===instance) {
            try {
                return dev.capabilities[k].properties.nonControllable
            }
            catch { console.log('could not get noncontrollable for', instance) }
        }
    }
    return false

}

export const devicesByDisplayCategory = (categories, searchterm) => {

    //console.log('dbc',categories, searchterm)
    const devices = useDeviceStore.getState().devices
    if (!categories) {
        categories='ALL'
    }
    if (!Array.isArray(categories)) {
        categories=[categories]
    }
    var categoryDevices=[]
    for (var j = 0; j < categories.length; j++) {
        var category=categories[j]
        for (var id in devices) {
            if (devices[id].displayCategories.includes(category) || category==='ALL') {
                if (!searchterm || devices[id].friendlyName.toLowerCase().includes(searchterm.toLowerCase())) {
                    categoryDevices.push(devices[id])
                }
            } 
        }
    }
    categoryDevices.sort(function(a, b)  {
        var x=a['friendlyName'].toLowerCase(),
        y=b['friendlyName'].toLowerCase();
        return x<y ? -1 : x>y ? 1 : 0;
    });    
    return categoryDevices
    
}

export const getRecent = async scene => {
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    console.log('headers', headers)
    const response = await fetch(serverUrl + "/list/hub/recent", { headers: headers })
    var result = await response.json()
    console.log('ohnooo', result)
    return result
}

export const getHistoryForDevice = async (dev, prop, page) => {
        
    // Requests the history for a specific device and property.  It allows for pagination since the data could be very
    // large.  This requires the Influx adapter in order to see history.
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    var url = serverUrl + "list/influx/history/"+dev+"/"+prop
    if (page) { url=url+"/"+page }
    const response = await fetch(url, { headers: headers })
    return await response.json()
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

    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const body = devs
    const response = await fetch(serverUrl+"/list/influx/last/"+val, { headers: headers, method: "post", body: JSON.stringify(body)})
    var result = await response.json()
    return checkJSON(result)
}

export function isFavorite(endpointId) {
    const favorites = useUserStore.getState().preferences.favorites
    return favorites.includes(endpointId)
}

export function makeFavorite(endpointId) {
    const favorites = useUserStore.getState().preferences.favorites
    const update = useUserStore.getState().update
    if (!favorites.includes(endpointId)) {
        update('favorites', [...favorites, endpointId])
    }
}

export function removeFavorite(endpointId) {
    const favorites = [...useUserStore.getState().preferences.favorites]
    const update = useUserStore.getState().update
    if (favorites.includes(endpointId)) {
        // eslint-disable-next-line 
        const [ endpointId, ...rest ] = favorites
        update('favorites', [...rest ])
    }
}

export function isReachable(deviceState) {
    // requires devicestate to prevent subscription in the helper
    try {
        if (deviceState.EndpointHealth.connectivity.value.value==='OK') {
            return true
        }
    }
    catch {}
    return false
}
