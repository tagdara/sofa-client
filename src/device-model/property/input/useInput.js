import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { camelCase, getInputs } from 'store/deviceHelpers';

const useInput = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const inputs = getInputs(endpointId)
    const selections = inputs.map(inputChoice => ({value: inputChoice, label:  inputChoice }))
    const stateValue = deviceState && deviceState.InputController ? deviceState.InputController.input.value : undefined
    const inputValue = value !== undefined ? value : stateValue

    const selectInput = newInput => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, "InputController", 'SelectInput', { "input": newInput } )
    }

    const inputLabel = (!inputValue || inputValue.includes(" ")) ? inputValue : camelCase(inputValue)

    // set default in activity editor
    if (directive && value === undefined) {
        selectInput(stateValue)
    }

    return { inputValue, inputLabel, selections, inputs, selectInput }

}

export default useInput;
