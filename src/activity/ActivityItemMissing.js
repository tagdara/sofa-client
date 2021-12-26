import React from 'react';
import CardLine from 'components/CardLine'
import { isFavorite, removeFavorite } from 'store/deviceHelpers'
import { X as Close, CloudOff } from 'react-feather'
import { ActionIcon } from '@mantine/core';

const ActivityItemMissing = props => {

    // If this isn't a favorite, it's probably not missing it's just not loaded yet
    if (!isFavorite(props.endpointId)) { return null }

    return (
        <CardLine   icon={<CloudOff size={20} />}
                    primary={"Missing: "+props.endpointId} 
        >
            <ActionIcon size={"small"} onClick={ (event) => { event.stopPropagation(); removeFavorite(props.endpointId); }} >
                <Close size={20} />
            </ActionIcon>
        </CardLine>
    );

}

export default ActivityItemMissing;

