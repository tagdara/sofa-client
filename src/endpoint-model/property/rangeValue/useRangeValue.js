import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'
import { getControllerByInstance } from 'store/deviceHelpers'

const useRangeValue = ( endpointId, instance, value, directive) => {

    // Mode is an instanced controller and the endpointState is stored by instance name

    const controller = "Alexa.RangeController"
    const { device, deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateRangeValue = deviceState?.[instance]?.rangeValue?.value
    const rangeValue = value?.rangeValue ? value.rangeValue : stateRangeValue
    const rangeValueLabel = rangeValue
    const disabled = false

    const rangeController = getControllerByInstance(device,instance)
    const minimumRange = rangeController?.configuration?.supportedRange?.minimumValue !== undefined || 0
    const maximumRange = rangeController?.configuration?.supportedRange?.maximumValue || 100
    const precision = rangeController?.configuration?.supportedRange?.precision || 1
    const sliderPrecision = Math.round((maximumRange - minimumRange) / 100)

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setRangeValue(stateRangeValue)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setRangeValue = newRangeValue => {
        console.log('instance', instance)
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, controller, "SetRangeValue", {"rangeValue": newRangeValue}, {}, instance)
    }
    
    return { rangeValue, rangeValueLabel, instance, minimumRange, maximumRange, precision, sliderPrecision, setRangeValue, disabled }

}

export default useRangeValue;
