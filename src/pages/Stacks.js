import React, { useContext } from 'react';

import { LayoutContext } from 'layout/LayoutProvider';
import Stack from 'layout/Stack';

export default function Stacks(props) {
    
    // Stack data is actually stored in LayoutProvider even though it logically should reside here because Stacks gets unloaded
    // and causes long re-renders by loading the stack definitions and modules.

    const { stackLayout, currentStack, maxStacks } = useContext(LayoutContext);

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
