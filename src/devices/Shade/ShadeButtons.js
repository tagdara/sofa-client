import React from 'react';
import { directive } from 'store/directive'
import { ActionIcon, Group } from '@mantine/core'
import { ChevronUp, ChevronDown, Minus } from 'react-feather'

const ShadeButtons = props => {

    function handlePress(modechoice) {
        directive(props.endpointId, 'Shade.Position', 'SetMode', { "mode": modechoice}, {})
    }
    
    return ( 
        <Group spacing={4}>
            <ActionIcon variant="light" size="lg" onClick={ () => handlePress('Position.Down') }>
                <ChevronDown size={20} />
            </ActionIcon >
            <ActionIcon variant="light" size="lg" onClick={ () => handlePress('Position.Stop') }>
                <Minus size={20} />
            </ActionIcon >
            <ActionIcon variant="light" size="lg" onClick={ () => handlePress('Position.Up') }>
                <ChevronUp size={20} />
            </ActionIcon >
        </Group>
    );
}

export default ShadeButtons;

