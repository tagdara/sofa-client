import React from 'react';
import { ActionIcon, Group, Paper } from '@mantine/core';
import { Star } from 'react-feather'

import ActivityName from "activity/editor/layout/ActivityName"
import ActivityDetails from "activity/editor/layout/ActivityDetails"
import { makeFavorite, removeFavorite } from 'store/deviceHelpers'
import useActivityEditorStore from 'store/activityEditorStore'
import useUserStore from 'store/userStore'
import SectionHeader from 'layout/SectionHeader';

const ActivityHeader = props => {

    const endpointId = useActivityEditorStore( state => state.endpointId )
    const favorites = useUserStore( state => state.preferences.favorites )
    const favorite = favorites && favorites.includes(endpointId)

    function toggleFavorite() {
        if (!favorite) {
            makeFavorite(endpointId) 
        } else {
            removeFavorite(endpointId)
        }
    }

    return (
        <SectionHeader>
            <Paper style={{ width: "100%", padding: "4px 8px" }}>
            <Group direction="column" style={{ width: "100%" }}>
                <ActivityName>
                    <ActionIcon size="lg" color={favorite ? "primary" : undefined} variant={ favorite ? "light" : undefined} onClick={toggleFavorite}>
                        <Star size={20} />
                    </ActionIcon>
                </ActivityName>
                <ActivityDetails />
            </Group>
            </Paper>
        </SectionHeader>    
    )

};

export default ActivityHeader
