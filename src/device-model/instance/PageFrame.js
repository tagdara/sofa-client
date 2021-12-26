import React from 'react';
import useLayoutStore from 'store/layoutStore'
import { useMantineTheme, SimpleGrid } from '@mantine/core';
import { useViewportSize, useMediaQuery } from '@mantine/hooks';

import SectionHeader from 'components/SectionHeader';
import { Divider, Group } from '@mantine/core'

export const PageFrame = props => {

    const wide = useMediaQuery('(min-width: 640px)');

    // TODO - this padding is a shim for bad flexbox alignment at the top level
    return  <Group direction="column" grow noWrap style={{ margin: "0 auto", width: "100%", paddingBottom : wide ? 64 : undefined }} >
                { props.title && <SectionHeader title={props.title} /> }
                <SectionFrame last={true} {...props} />
            </Group>
}

export const SectionFrame = props => {

    const { maxStacks, stacksWidth} = usePageFrame()

    return (
        <>
        { props.title && <Divider variant="dashed" label={props.title} style={{ paddingTop: 16, paddingBottom: 4,  margin: "0 auto", width: "100%", maxWidth: stacksWidth }} /> }
        <SimpleGrid cols = { props.cols? props.cols : maxStacks } 
                    spacing="sm" 
                    style={{ 
                        margin: "0 auto", 
                        width: "100%", 
                        maxWidth: stacksWidth
                    }}
        >
            { props.children}
        </SimpleGrid>
        </>
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
