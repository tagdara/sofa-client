import React from 'react';
import { directive } from 'store/directive'
import { getModes } from 'store/deviceHelpers'
import { Group } from '@mantine/core'
import CardSegmentedControl from 'components/CardSegmentedControl'

const ReceiverSurroundSelect = props => {

    const receiver = props.deviceState
    if (!receiver) { return null }

    const surroundModes = getModes(props.endpointId).Surround
    const on = receiver.PowerController.powerState.value === 'ON' 
    const modeValue = receiver.Surround.mode.value

    function handleModeChoice(modechoice) {
        directive(props.endpointId, "Surround", 'SetMode', { "mode": modechoice })
    }; 

    const modes = Object.keys(surroundModes).map( surround => ({ value : surround, label : surroundModes[surround] }))

    return (
        <Group noWrap style={{ width: "100%", position: 'relative' }} position="apart">
            <CardSegmentedControl
                style={{ flexGrow: 1 }}
                size="sm"
                value={ modeValue }
                data={ modes}
                onChange={ handleModeChoice } 
                disabled={!on}
            />                   
        </Group>
    );
}

export default ReceiverSurroundSelect;
