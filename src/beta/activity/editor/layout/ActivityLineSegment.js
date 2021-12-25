import React from 'react';
import { SimpleGrid } from '@mantine/core';

const ActivityLineSegment = props => {
    
    return (
        <SimpleGrid cols={props.wide ? 3 : 1}>
            { props.children }
        </SimpleGrid>
    )
}

export default ActivityLineSegment
