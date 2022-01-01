import React from 'react';
import { ActionIcon, Group } from '@mantine/core';
import { Star } from 'react-feather'

import ActivityName from "activity/editor/layout/ActivityName"
import ActivityDetails from "activity/editor/layout/ActivityDetails"
import { isFavorite, makeFavorite } from 'store/deviceHelpers'
import useActivityEditorStore from 'store/activityEditorStore'
import SectionHeader from 'components/SectionHeader';

const ActivityHeader = props => {

    const endpointId = useActivityEditorStore( state => state.endpointId )
    var favorite = isFavorite(endpointId)

    function toggleFavorite() {
        makeFavorite(endpointId, !favorite)
        favorite = isFavorite(endpointId)
    }

    return (
        <SectionHeader>
            <Group direction="column" style={{ width: "100%" }}>
                <ActivityName>
                    <ActionIcon size="lg" color={favorite ? "primary" : undefined} variant={ favorite ? "light" : undefined} onClick={toggleFavorite}>
                        <Star size={20} />
                    </ActionIcon>
                </ActivityName>
                <ActivityDetails />
            </Group>
        </SectionHeader>    
    )

};

export default ActivityHeader
