import create from 'zustand'
import { persist } from "zustand/middleware"

const useDeviceStore = create(persist(
    (set, get) => ({
        devices: {},
        constrollerProperties: {},
        directives: {},
        getInputs: ( endpointId, exclude=[] ) => {
            var dev = get().devices[endpointId]
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
        },
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
        name: "deviceStore", // unique name
        getStorage: () => localStorage, // (optional) by default the 'localStorage' is used        
    }
))

export default useDeviceStore;