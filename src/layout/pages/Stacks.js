import React, { useEffect } from 'react';
import Stack from 'layout/Stack';
import useLayoutStore from 'store/layoutStore'
import { refreshStackLayout } from 'store/layoutHelpers'

export default function Stacks(props) {
    
    // Stack data is actually stored in LayoutProvider even though it logically should reside here because Stacks gets unloaded
    // and causes long re-renders by loading the stack definitions and modules.
    const stackLayout = useLayoutStore(state => state.stackLayout )
    const currentStack = useLayoutStore(state => state.currentStack )
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const maxStacks = Math.min(4, Math.round( maxScreenWidth / minStackWidth))

    useEffect(() => {
        refreshStackLayout()
    }, [])


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
        stackLayout && stackLayout.length>0 ? 
        <>
            { filterStacks().map( stack =>
                <Stack key={stack} stack={ stack } xs={ Math.floor( 12/maxStacks )}  />
            )}
        </>
        :
        null

    );
}
