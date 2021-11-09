import React from 'react';
import CardBase from 'components/CardBase';

const ItemBase = props => {

    // Itembase prevents having to have multiple specific wrappers for items that could appear as individual cards
    // or as part of a list, while also eliminating an empty card for components that have no children
    //
    // Item Types:
    //      card        (default) wraps the item in a card
    //      listItem    does not wrap the item, assuming that it is part of a larger list that is already wrapped or contained
    //
    // TODO switch to case and add other item sizes

    if (props.children === null) {
        return null
    }

    if (props.itemType === "card") {
        return (
            <CardBase small={ props.small } >
                { props.children }
            </CardBase>
        )
    }

    if (props.itemType === "listItem") {
        return (    
            <>
                { props.children}
            </>
        )
    }

    return (
        <>
        { props.children}
    </>
    )

}

ItemBase.defaultProps = {
    itemType: "card",
}

export default ItemBase;