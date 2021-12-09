import React, { useState, useEffect } from 'react';
import { getStack, renderSuspenseModule } from 'beta/helpers/layoutHelpers';
import { Group } from '@mantine/core';
import StackMoreButton from 'beta/layout/StackMoreButton';
import StackPicker from 'beta/layout/StackPicker'

export default function CardStack(props) {
    
    const [ stack, setStack ]=useState(props.stack)
    const [ stackData, setStackData ] = useState(undefined)
    const [ expand, setExpand ]=useState(false)

    console.log('props.stack',props.stack)

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

    const cards = stackData.cards.map( (card, i) => renderSuspenseModule(card['module']))

    return (
        <Group direction="column" style={{ width: "100%", justifyContent: "flex-start"}} >
            <Group direction="row" noWrap style={{ width: "100%"}} position="apart">
                {props.showTitle &&
                    <StackPicker stack={stack} setStack={setStack} />
                }
                { expandable() && <StackMoreButton expand={expand} onClick={ () => setExpand(!expand)} /> } 
            </Group>
            { stackData &&
                <>
                { cards.map( (card, i) => 
                    <React.Fragment key={"card"+i}>
                    { (!card.hasOwnProperty('expand') || card['expand']===expand ) ?
                            <>
                                { card }
                            </>
                        :
                        null
                    }
                    </React.Fragment >
                )}
                </>
            }
        </Group>
    );
}

CardStack.defaultProps = {
    showTitle: true,
}
