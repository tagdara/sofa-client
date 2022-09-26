import React from 'react';
import { ActionIcon, Stack, Paper } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import ActivityName from "activity/editor/layout/ActivityName"
import ActivityDetails from "activity/editor/layout/ActivityDetails"
import { makeFavorite, removeFavorite } from 'user/favorites/favoritesUtils'
import useActivityEditorStore from 'activity/editor/activityEditorStore'
import useUserStore from 'user/userStore'
import SectionHeader from 'layout/section/SectionHeader';

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
            <Stack style={{ width: "100%" }}>
                <ActivityName>
                    <ActionIcon size="lg" color={favorite ? "primary" : undefined} variant={ favorite ? "light" : undefined} onClick={toggleFavorite}>
                        <IconStar size={20} />
                    </ActionIcon>
                </ActivityName>
                <ActivityDetails />
            </Stack>
            </Paper>
        </SectionHeader>    
    )

};

export default ActivityHeader
