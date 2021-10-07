import React from 'react';
import SofaListItem from 'components/SofaListItem';
import CardBase from 'components/CardBase';

export default function SofaItem(props) {

    if (!props.nested) {
        return (
            <CardBase>
                <SofaListItem {...props} />
            </CardBase>
        )
    }

    return (
        <SofaListItem {...props} />
    );
}


