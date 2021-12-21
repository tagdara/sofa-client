import React from 'react';
import { SimpleGrid } from '@mantine/core';

export const SectionFrame = props => {

    return (
        <SimpleGrid cols = { props.cols} 
                    spacing="sm" 
                    style={{ 
                        paddingBottom : (props.wide && props.last) ? 64 : undefined, 
                        margin: "0 auto", 
                        width: "100%", 
                        maxWidth: props.width ? props.width : "100%"
                    }}
        >
            { props.children}
        </SimpleGrid>
    );
}

export default SectionFrame