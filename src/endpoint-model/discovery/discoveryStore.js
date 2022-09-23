import create from 'zustand'
import { persist } from "zustand/middleware"

const useDiscoveryStore = create(persist(
    (set, get) => ({
        devices: {},
        controllerProperties: {},
        directives: {},
        getController: (endpointId, name) => {
            var dev = get().devices[endpointId]
            if (dev!==undefined) {
                for (var j = 0; j < dev.capabilities.length; j++) {
                    if (dev.capabilities[j].interface.endsWith("."+name)) {
                        return dev.capabilities[j]
                    }
                    if (dev.capabilities[j].hasOwnProperty('instance') && dev.capabilities[j].instance.endsWith("."+name)) {
                        return dev.capabilities[j]
                    }
                    
                }
            }
            return undefined
        },
    }),
    {
        name: "discovery", // unique name
        getStorage: () => localStorage, // (optional) by default the 'localStorage' is used        
    }
))

export default useDiscoveryStore;