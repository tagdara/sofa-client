import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useShortcuts = (endpointId, value, directive) => {

    // Shortcuts property of an AreaController

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateShortcuts = deviceState && deviceState.AreaController ? deviceState.AreaController.shortcuts.value : []
    const shortcuts = value ? value : stateShortcuts

    const setShortcuts = newShortcuts => {
        activeDirective(endpointId, "AreaController", "SetShortcuts", {"shortcuts": newShortcuts })
    }

    const addShortcuts = newShortcuts => {
        activeDirective(endpointId, "AreaController", "SetShortcuts", {"shortcuts": [...shortcuts, ...newShortcuts] })
    }

    const removeShortcuts = newShortcuts => {
        const finalShortcuts = shortcuts.filter( item => !newShortcuts.includes(item))
        activeDirective(endpointId, "AreaController", "SetShortcuts", {"shortcuts": [ ...finalShortcuts ] })
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setShortcuts(stateShortcuts)
    }

    return { shortcuts, setShortcuts, addShortcuts, removeShortcuts }
}

export default useShortcuts 
