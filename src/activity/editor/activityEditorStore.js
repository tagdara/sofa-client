import { create } from 'zustand'


const useActivityEditorStore = create((set, get) => ({
    activity: {},
    endpointId: undefined,
    saved: true,
}))

export default useActivityEditorStore;