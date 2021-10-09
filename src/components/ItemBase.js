import React from 'react';
import CardBase from 'components/CardBase';

const ItemBase = props => {

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