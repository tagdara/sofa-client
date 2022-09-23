import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export const deviceDirectives = (dev, includeNonControllable) => {
    const directives = useDiscoveryStore.getState().directives
    if (dev === undefined) { return undefined }
    var dirs = []

    if (dev.hasOwnProperty('capabilities')) {
        for (var j = 0; j < dev.capabilities.length; j++) {
            var capabilityInterface = dev.capabilities[j].interface
            if (directives.hasOwnProperty(capabilityInterface)) {
                var idirs = Object.keys(directives[capabilityInterface])
                for (var i = 0; i < idirs.length; i++) {
                    if (dev.capabilities[j].properties && dev.capabilities[j].properties.nonControllable && !includeNonControllable) { continue}
                    if (dev.capabilities[j].hasOwnProperty('instance')) {
                        dirs.push({"directive":idirs[i], "controller":capabilityInterface, "instance":dev.capabilities[j].instance})
                    } else {
                        dirs.push({"directive":idirs[i], "controller":capabilityInterface, "instance":undefined})
                    }
                }
            } 
        }
    } 
    return dirs
}
