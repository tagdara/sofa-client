import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'store/directive'
import { camelCase, getInputs } from 'store/deviceHelpers';

const useInput = ( endpointId, value, directive) => {

    const controller = "Alexa.InputController"
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective

    const inputs = getInputs(endpointId)
    const selections = inputs.map(inputChoice => ({value: inputChoice, label:  inputChoice }))
    const stateValue = deviceState?.[controller]?.input?.value
    const inputValue = value?.input ? value.input : stateValue

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            selectInput(stateValue)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const selectInput = newInput => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, controller, 'SelectInput', { "input": newInput } )
    }

    const inputLabel = (!inputValue || inputValue.includes(" ")) ? inputValue : camelCase(inputValue)

    return { inputValue, inputLabel, selections, inputs, selectInput }

}

export default useInput;
