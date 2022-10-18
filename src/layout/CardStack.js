import React, { useState, useEffect } from 'react';
import { getStack, renderSuspenseModule } from 'helpers/layoutHelpers';
import { Stack } from '@mantine/core';
import StackPicker from 'layout/StackPicker';
import { useDidUpdate } from '@mantine/hooks';

export default function CardStack(props) {
    
    const [ stack, setStack ]=useState(props.stack)
    const [ stackData, setStackData ] = useState(undefined)
    const expand = false
    const [ cards, setCards ] = useState([])

    useEffect(() => { 
        if (stack) {
            getStack(stack)
                //.then(result=> console.log('real stack data', result))
                .then(result=> setStackData(result))
        }
    }, [ stack ] )

    useDidUpdate( () => {
        const cardData = stackData.cards.filter( card => (!card.expand || card.expand === expand))
        const renderCards = cardData.map( 
            (card, i) => renderSuspenseModule(
                            card.module, 
                            {...card.props },
                            i 
                        )
            )
        setCards(renderCards)
    }, [ stackData ])

    if (!stack || !stackData ) { return null}

    return (
        <Stack
            spacing="xs" 
            style={{   
                        paddingBottom: 16, 
                        minWidth: 320, 
                        maxWidth: 480, 
                        height: "100%", 
                        width: "100%", 
                        justifyContent: "flex-start",
                    }} 
        >
            {props.showTitle &&
                <StackPicker stack={stack} setStack={setStack} />
            }
            { cards } 
        </Stack>
    );
}

CardStack.defaultProps = {
    showTitle: true,
}
