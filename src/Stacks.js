import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import Stack from './Stack';


export default function Stacks(props) {
    
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
                <Stack key={stack} stack={ stack } xs={ Math.floor( 12/maxStacks )} />
            )}
        </>
        :
        null

    );
}
