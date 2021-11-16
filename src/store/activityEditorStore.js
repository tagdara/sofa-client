import create from 'zustand'
//import useLoginStore from "store/loginStore"
//const serverUrl = "https://"+window.location.hostname;

const useActivityEditorStore = create((set, get) => ({
    activity: {},
    endpointId: undefined,
    saved: true,
}))

export default useActivityEditorStore;