import React from 'react';
import useLayoutStore from 'store/layoutStore'
import { useMantineTheme, SimpleGrid } from '@mantine/core';
import { useViewportSize, useMediaQuery } from '@mantine/hooks';

export const PageFrame = props => {

    const { maxStacks, stacksWidth} = usePageFrame()

    return (
        <SimpleGrid cols={maxStacks} spacing="sm" style={{ margin: "0 auto", width: "100%", maxWidth: stacksWidth }}>
            { props.children}
        </SimpleGrid>
    );
}

export const usePageFrame = props => {

    const theme = useMantineTheme()
    const wide = useMediaQuery('(min-width: 640px)');
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const stackPad = wide ? theme.spacing['xl'] : theme.spacing['xs']
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const { width } = useViewportSize()
    const stacksWidth = Math.min(maxScreenWidth, width)
    const maxStacks = Math.min(4, Math.floor( stacksWidth / (minStackWidth+stackPad)))

    return { maxStacks, stacksWidth }

}

export default PageFrame