import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'
import { camelCase } from 'helpers/camelCase'

const useLockState = (endpointId, value, directive) => {

    const controller = "Alexa.LockController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateLockState = deviceState?.[controller]?.lockState?.value
    const lockState = value !== undefined ? value : stateLockState
    const lockStateBool = lockState === "LOCKED"

    const setLockState = newState => {
        activeDirective(endpointId, controller, "SetLockState", {"lockState": newState})
    }

    const lockStateLabel = camelCase(lockState)

    const lock = newState => {
        activeDirective(endpointId, controller, "Lock", {})
    }

    const unlock = newState => {
        activeDirective(endpointId, controller, "Unlock", {})
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
