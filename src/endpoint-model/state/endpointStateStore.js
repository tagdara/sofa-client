import create from 'zustand'
import { persist } from "zustand/middleware"

const useEndpointStateStore = create(persist(
    set => ({
        deviceStates: {},
    }),
    {
        name: "endpointState", // unique name
        getStorage: () => localStorage, // (optional) by default the 'localStorage' is used        
    }
))

export default useEndpointStateStore;

