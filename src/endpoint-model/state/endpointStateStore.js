import { create } from 'zustand'

import { persist, createJSONStorage } from 'zustand/middleware'

const useEndpointStateStore = create(persist(
    set => ({
        deviceStates: {},
    }),
    {
        name: "endpointState", // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used        
    }
))

export default useEndpointStateStore;

