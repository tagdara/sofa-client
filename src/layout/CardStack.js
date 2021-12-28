import React, { useState, useEffect } from 'react';
import { getStack, renderSuspenseModule } from 'helpers/layoutHelpers';
import { Group } from '@mantine/core';
// import StackMoreButton from 'layout/StackMoreButton';
import StackPicker from 'layout/StackPicker';

export default function CardStack(props) {
    
    const [ stack, setStack ]=useState(props.stack)
    const [ stackData, setStackData ] = useState(undefined)
    //const [ expand, setExpand ]=useState(false)
    const expand = false

    useEffect(() => { 
        if (stack) {
            getStack(stack)
                //.then(result=> console.log('real stack data', result))
                .then(result=> setStackData(result))
        }


    }, [ stack ] )

    //function expandable() {
    //    if (stackData && stackData.cards) {
    //        for (var i = 0; i < stackData.cards.length; i++) {
    //            if (stackData.cards[i].hasOwnProperty('expand')) {
    //                return true
    //            }
    //        }
    //    }
    //    return false
   // }

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
            {props.showTitle &&
                <StackPicker stack={stack} setStack={setStack} />
            }
            { cards } 
        </Group>
    );
}

//                 { expandable() && <StackMoreButton expand={expand} onClick={ () => setExpand(!expand)} /> } 


CardStack.defaultProps = {
    showTitle: true,
}
