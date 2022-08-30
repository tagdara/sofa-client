import React from 'react';
import { SimpleGrid } from '@mantine/core';
import usePageFrame from 'helpers/usePageFrame'

export const SectionGrid = props => {

    const { maxStacks, stacksWidth} = usePageFrame()

    return (
            <SimpleGrid cols = { props.cols? props.cols : maxStacks } 
                        spacing="sm" 
                        style={{ 
                            margin: "0 auto", 
                            width: "100%", 
                            minWidth: maxStacks * 324,
                            maxWidth: stacksWidth
                        }}
            >
                { props.children}
            </SimpleGrid>
    );
}

export default SectionGrid
