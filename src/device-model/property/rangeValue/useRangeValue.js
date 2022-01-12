import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useRangeValue = ( endpointId, userInstance, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const instance = userInstance.includes('.') ? userInstance.split('.')[1] : userInstance
    const stateRangeValue = deviceState && deviceState.hasOwnProperty(instance) ? deviceState[instance].rangeValue.value : undefined
    const userValue = value !== undefined ? value : undefined
    const rangeValue = userValue ? userValue : stateRangeValue
    const disabled = false

    const setRangeValue = newRangeValue => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, "RangeValueController", "SetRangeValue", {"rangeValue": newRangeValue}, {}, instance)
    }
    
    const rangeValueLabel = rangeValue

    // set default in activity editor
    if (directive && value === undefined) {
        setRangeValue(stateRangeValue)
    }

    return { rangeValue, rangeValueLabel, instance, setRangeValue, disabled }

}

export default useRangeValue;
