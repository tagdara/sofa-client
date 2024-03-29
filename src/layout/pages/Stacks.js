import React, { useEffect } from 'react';
import CardStack from 'layout/CardStack';
import useLayoutStore from 'layout/layoutStore'
import { refreshStackLayout } from 'helpers/layoutHelpers';
import PageFrame from 'layout/PageFrame'
import usePageFrame from 'helpers/usePageFrame'
import SectionGrid from 'layout/section/SectionGrid'
import SectionFrame from 'layout/section/SectionFrame'
import SystemPage from 'layout/pages/SystemPage'

export default function Stacks(props) {

    const stackLayout = useLayoutStore(state => state.stackLayout )
    const currentStack = useLayoutStore(state => state.currentStack )
    const { maxStacks } = usePageFrame()

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
            <SectionFrame padScroll={96}>
            { currentStack === "System" ?
                <SystemPage />
                :
                <SectionGrid style={{ minWidth: maxStacks * 324 }}>
                { filterStacks().map( stack =>
                    <CardStack key={stack} stack={ stack }  />
                )}
                </SectionGrid>
            }
            </SectionFrame>
        </PageFrame>
    );
}
