import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { getInputs } from 'store/deviceHelpers';

const useInput = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective

    const inputs = getInputs(endpointId)
    const selections = inputs.map(inputChoice => ({value: inputChoice, label:  inputChoice }))
    const userValue = value && value.input ? value.input : null
    const stateValue = deviceState && deviceState.InputController ? deviceState.InputController.input.value : undefined

    const inputValue = userValue ? userValue : stateValue

    const selectInput = newInput => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        activeDirective(endpointId, "InputController", 'SelectInput', { "input": newInput } )
    }

    var camelSentence = (str) => {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
        {
            return chr.toUpperCase();
        });
    }
    
    const inputLabel = camelSentence(inputValue)

    return { inputValue, inputLabel, selections, inputs, selectInput }

}

export default useInput;
