import React from 'react';
import { directive } from 'endpoint-model/directive/directive'
import { ActionIcon, Group } from '@mantine/core'
import { IconChevronUp, IconChevronDown, IconMinus } from '@tabler/icons';
const ShadeButtons = props => {

    function handlePress(modechoice) {
        directive(props.endpointId, 'Shade.Position', 'SetMode', { "mode": modechoice}, {})
    }
    
    return ( 
        <Group spacing={4}>
            <ActionIcon variant="light" size="lg" onClick={ () => handlePress('Position.Down') }>
                <IconChevronDown size={20} />
            </ActionIcon >
            <ActionIcon variant="light" size="lg" onClick={ () => handlePress('Position.Stop') }>
                <IconMinus size={20} />
            </ActionIcon >
            <ActionIcon variant="light" size="lg" onClick={ () => handlePress('Position.Up') }>
                <IconChevronUp size={20} />
            </ActionIcon >
        </Group>
    );
}

export default ShadeButtons;

