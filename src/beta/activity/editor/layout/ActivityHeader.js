import React from 'react';
import { ActionIcon, Group } from '@mantine/core';
import { Star } from 'react-feather'

import ActivityName from "beta/activity/editor/layout/ActivityName"
import ActivityDetails from "beta/activity/editor/layout/ActivityDetails"
import { isFavorite, makeFavorite } from 'store/deviceHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

const ActivityHeader = props => {

    const endpointId = useActivityEditorStore( state => state.endpointId )
    var favorite = isFavorite(endpointId)

    function toggleFavorite() {
        makeFavorite(endpointId, !favorite)
        favorite = isFavorite(endpointId)
    }

    return (    
        <Group direction="column" noWrap style={{width: "100%"}}>
            <ActivityName>
                <ActionIcon size="lg" color={favorite ? "primary" : undefined} variant={ favorite ? "light" : undefined} onClick={toggleFavorite}>
                    <Star size={20} />
                </ActionIcon>
            </ActivityName>
            <ActivityDetails />
        </Group>
    )

};

export default ActivityHeader
