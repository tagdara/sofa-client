import React from 'react';
import CardLine from 'beta/components/CardLine'
import { X as ClearIcon, CloudOff } from 'react-feather'
import { ActionIcon } from '@mantine/core';
import { isFavorite, removeFavorite } from 'store/deviceHelpers'

const ActivityItemMissing = props => {

    // If this isn't a favorite, it's probably not missing it's just not loaded yet
    if (!isFavorite(props.endpointId)) { return null }

    return (
            <CardLine   icon={<CloudOff size={20} /> }
                        primary={"Missing: "+props.endpointId}
            >
                <ActionIcon onClick={ () => removeFavorite(props.endpointId) } >
                    <ClearIcon size={20} />
                </ActionIcon>
            </CardLine>
    );

}

export default ActivityItemMissing;

