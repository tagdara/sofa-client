import React, { useState, useEffect } from 'react';
import { getStack, renderSuspenseModule } from 'beta/helpers/layoutHelpers';
import { Group } from '@mantine/core';
import StackMoreButton from 'beta/layout/StackMoreButton';
import StackPicker from 'beta/layout/StackPicker'

export default function CardStack(props) {
    
    const [ stack, setStack ]=useState(props.stack)
    const [ stackData, setStackData ] = useState(undefined)
    const [ expand, setExpand ]=useState(false)

    useEffect(() => { 
        if (stack) {
            getStack(stack)
                //.then(result=> console.log('real stack data', result))
                .then(result=> setStackData(result))
        }


    }, [ stack ] )

    function expandable() {
        if (stackData && stackData.cards) {
            for (var i = 0; i < stackData.cards.length; i++) {
                if (stackData.cards[i].hasOwnProperty('expand')) {
                    return true
                }
            }
        }
        return false
    }

    if (!stack || !stackData ) { return null}

    const cardData = stackData.cards.filter( card => (!card.expand || card.expand === expand))
    const cards = cardData.map( (card, i) => renderSuspenseModule(card['module'], card['props'], i ))

    return (
        <Group  noWrap 
                spacing="xs" 
                direction="column" 
                style={{    paddingBottom: 16, 
                            minWidth: 320, 
                            maxWidth: 480, 
                            height: "100%", 
                            width: "100%", 
                            justifyContent: "flex-start"
                        }} 
        >
            <Group direction="row" noWrap spacing="xl" style={{ padding: 8, width: "100%"}} position="apart">
                {props.showTitle &&
                    <StackPicker stack={stack} setStack={setStack} />
                }
                { expandable() && <StackMoreButton expand={expand} onClick={ () => setExpand(!expand)} /> } 
            </Group>
            { cards } 
        </Group>
    );
}

CardStack.defaultProps = {
    showTitle: true,
}
