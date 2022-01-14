import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { camelCase } from 'store/deviceHelpers';

const useLockState = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateLockState = deviceState && deviceState.LockController && deviceState.LockController.lockState ? deviceState.LockController.lockState.value : undefined
    const lockState = value !== undefined ? value : stateLockState
    const lockStateBool = lockState === "LOCKED"

    const setLockState = newState => {
        activeDirective(endpointId, "LockController", "SetLockState", {"lockState": newState})
    }

    const lockStateLabel = camelCase(lockState)

    const lock = newState => {
        activeDirective(endpointId, "LockController", "Lock", {})
    }

    const unlock = newState => {
        activeDirective(endpointId, "LockController", "Unlock", {})
    }

    const toggle = () => {
        if (lockState === "UNLOCKED") {
            lock()
        } else {
            unlock()
        }
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setLockState(stateLockState)
    }

    return { lockState, lockStateBool, lockStateLabel, lock, unlock, setLockState, toggle }

}

export default useLockState
