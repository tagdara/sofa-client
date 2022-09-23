import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'

const useShortcuts = (endpointId, value, directive) => {

    // Shortcuts property of an AreaController
    const controller = "Sofa.AreaController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateShortcuts = deviceState?.[controller]?.shortcuts?.value || []
    const shortcuts = value ? value : stateShortcuts

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setShortcuts(stateShortcuts)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setShortcuts = newShortcuts => {
        activeDirective(endpointId, controller, "SetShortcuts", {"shortcuts": newShortcuts })
    }

    const addShortcuts = newShortcuts => {
        activeDirective(endpointId, controller, "SetShortcuts", {"shortcuts": [...shortcuts, ...newShortcuts] })
    }

    const removeShortcuts = newShortcuts => {
        const finalShortcuts = shortcuts.filter( item => !newShortcuts.includes(item))
        activeDirective(endpointId, controller, "SetShortcuts", {"shortcuts": [ ...finalShortcuts ] })
    }

    return { shortcuts, setShortcuts, addShortcuts, removeShortcuts }
}

export default useShortcuts 
