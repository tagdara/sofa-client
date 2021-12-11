import React, { useEffect } from 'react';
import CardStack from 'beta/layout/CardStack';
import useLayoutStore from 'store/layoutStore'
import { refreshStackLayout } from 'beta/helpers/layoutHelpers'
import { SimpleGrid } from '@mantine/core';

export default function Stacks(props) {

    const stackLayout = useLayoutStore(state => state.stackLayout )
    const currentStack = useLayoutStore(state => state.currentStack )
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const stackPad = useLayoutStore(state => state.stackPad )
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const maxStacks = Math.min(4, Math.floor( maxScreenWidth / (minStackWidth+stackPad)))

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
        <SimpleGrid cols={maxStacks} spacing="sm" style={{ margin: "0 auto", maxWidth: maxScreenWidth }}>
            { filterStacks().map( stack =>
                <CardStack key={stack} stack={ stack }  />
            )}
        </SimpleGrid>
    );
}
