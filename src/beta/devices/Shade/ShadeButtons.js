import React from 'react';
import { directive } from 'store/directive'
import { ActionIcon, Group } from '@mantine/core'
import { ChevronUp, ChevronDown, StopCircle } from 'react-feather'

const ShadeButtons = props => {

    function handlePress(modechoice) {
        directive(props.endpointId, 'Blinds.Position', 'SetMode', { "mode": modechoice}, {})
    }
    
    return ( 
        <Group>
            <ActionIcon onClick={ () => handlePress('Position.Down') }>
                <ChevronDown size={20} />
            </ActionIcon >
            <ActionIcon onClick={ () => handlePress('Position.Stop') }>
                <StopCircle size={20} />
            </ActionIcon >
            <ActionIcon onClick={ () => handlePress('Position.Up') }>
                <ChevronUp size={20} />
            </ActionIcon >
        </Group>
    );
}

export default ShadeButtons;

