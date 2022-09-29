import React, { useState, useEffect } from 'react';
import { getStack, renderSuspenseModule } from 'helpers/layoutHelpers';
import { Stack } from '@mantine/core';
// import StackMoreButton from 'layout/StackMoreButton';
import StackPicker from 'layout/StackPicker';
import useLayoutStore from 'layout/layoutStore'
import { useMediaQuery } from '@mantine/hooks';
import { useDidUpdate } from '@mantine/hooks';

export default function CardStack(props) {
    
    const [ stack, setStack ]=useState(props.stack)
    const [ stackData, setStackData ] = useState(undefined)
    //const [ expand, setExpand ]=useState(false)
    const expand = false
    const stackCardHighlight = useLayoutStore( state => state.stackCardHighlight)
    const wide = useMediaQuery('(min-width: 640px)');
    const [ cards, setCards ] = useState([])

    useEffect(() => { 
        if (stack) {
            getStack(stack)
                //.then(result=> console.log('real stack data', result))
                .then(result=> setStackData(result))
        }
    }, [ stack ] )

    useDidUpdate( () => {
        const cardData = stackData.cards.filter( card => (!card.expand || card.expand === expand)) //&& ( wide || !stackCardHighlight || stackCardHighlight === card.module) )
        const renderCards = cardData.map( 
            (card, i) => renderSuspenseModule(
                            card.module, 
                            {...card.props, 
                                hidden: !wide && stackCardHighlight && stackCardHighlight !== card.module 
                            },
                            i 
                        )
            )
        setCards(renderCards)
    }, [ stackData, stackCardHighlight ])

    if (!stack || !stackData ) { return null}

    // const cardData = stackData.cards.filter( card => (!card.expand || card.expand === expand)) //&& ( wide || !stackCardHighlight || stackCardHighlight === card.module) )
    // const rendercards = cardData.map( 
    //     (card, i) => renderSuspenseModule(
    //                     card.module, 
    //                     {...card.props, 
    //                         hidden: !wide && stackCardHighlight && stackCardHighlight !== card.module 
    //                     },
    //                     i 
    //                 )
    //     )
    

    return (
            <Stack
                spacing="xs" 
                style={{
                            paddingBottom: 16, 
                            minWidth: 320, 
                            maxWidth: 480, 
                            height: "100%", 
                            width: "100%", 
                            justifyContent: "flex-start"
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
