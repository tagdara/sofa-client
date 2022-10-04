import React from 'react';
import { Button, Group, Text } from '@mantine/core';

import { IconStar, IconChevronDown, IconChevronRight } from '@tabler/icons';

const FavoriteToggle = props => {
    
    return (
        <Button 
            fullWidth
            radius="md"
            size="md"
            variant={ "outline" }
            onClick={props.onClick}
        >
            <Group noWrap style={{ width: "100%"}}>
                <Group noWrap style={{ width: "100%"}}>
                    <IconStar size={20} />
                    <Text>Favorites</Text>
                </Group>
                { props.open ?
                    <IconChevronRight size={20} /> 
                :
                    <IconChevronDown size={20} />
                }
            </Group>
        </Button>            
    )
}

export default FavoriteToggle;

