import React, { useEffect } from 'react';
import CardStack from 'beta/layout/CardStack';
import useLayoutStore from 'store/layoutStore'
import { refreshStackLayout } from 'beta/helpers/layoutHelpers'
import { useMantineTheme, SimpleGrid } from '@mantine/core';
import { useViewportSize, useMediaQuery } from '@mantine/hooks';

export default function Stacks(props) {

    const theme = useMantineTheme()
    const wide = useMediaQuery('(min-width: 640px)');
    const stackLayout = useLayoutStore(state => state.stackLayout )
    const currentStack = useLayoutStore(state => state.currentStack )
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const stackPad = wide ? theme.spacing['xl'] : theme.spacing['xs']
    //const stackPad = 4
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const { width } = useViewportSize()
    const stacksWidth = Math.min(maxScreenWidth, width)
    const maxStacks = Math.min(4, Math.floor( stacksWidth / (minStackWidth+stackPad)))


    useEffect(() => {
        refreshStackLayout()
    }, [])

    if ( !stackLayout || !Object.keys(stackLayout).length ) { return null }

    function filterStacks() {
        if (maxStacks===1) {
            if (currentStack && stackLayout.includes(currentStack)) {
                return [currentStack]
            }
            return stackLayout.slice(0, 1)
        }
        return stackLayout.slice(0,maxStacks)
    }

    return (
        <SimpleGrid cols={maxStacks} spacing="sm" style={{ margin: "0 auto", maxWidth: stacksWidth }}>
            { filterStacks().map( stack =>
                <CardStack key={stack} stack={ stack }  />
            )}
        </SimpleGrid>
    );
}
