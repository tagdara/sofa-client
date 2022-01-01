import React, { useEffect } from 'react';
import CardStack from 'layout/CardStack';
import useLayoutStore from 'store/layoutStore'
import { refreshStackLayout } from 'helpers/layoutHelpers';
import { PageFrame, usePageFrame } from 'device-model/instance/PageFrame'

export default function Stacks(props) {

    const stackLayout = useLayoutStore(state => state.stackLayout )
    const currentStack = useLayoutStore(state => state.currentStack )
    const { maxStacks } = usePageFrame()

    console.log('current', currentStack)

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
        <PageFrame>
            { filterStacks().map( stack =>
                <CardStack key={stack} stack={ stack }  />
            )}
        </PageFrame>
    );
}
