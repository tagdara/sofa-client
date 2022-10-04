import React, { useState } from 'react';

import { selectPage } from 'helpers/layoutHelpers';

import ActivityItem from 'activity/ActivityItem';
import { isFavorite, makeFavorite } from 'user/favorites/favoritesUtils';
import { deleteActivityDefinition } from 'endpoint-model/controller/DefinitionController/deleteActivityDefinition'
import { ActionIcon, Group } from '@mantine/core';

import SectionHeader from 'layout/section/SectionHeader';
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import PageFrame from 'layout/PageFrame'

import { IconClock, IconStar, IconPlus } from '@tabler/icons';
import { sortByName, endpointIdsByDisplayCategory } from 'endpoint-model/discovery'

const ActivitiesLayout = props => {

    const [ favorites, setFavorites ] = useState(props.favorites)
    const [ showScheduled, setShowScheduled] = useState(false)
    const activities = sortByName(endpointIdsByDisplayCategory('ACTIVITY_TRIGGER'))

    if (!activities) { return null }

    function selectActivity(activity) {
        selectPage('ActivityEditorPage', {'endpointId':activity, 'noBottom':true } )
    }    

    function newActivity() {
        selectPage('ActivityEditorPage', {'noBottom':true})        
    }

    function toggleFavorites() {
        setFavorites(!favorites)
    }

    function toggleScheduled() {
        setShowScheduled(!showScheduled)
    }

    function getListItems() {
        var workingList = []
        if (activities) {
            workingList = [...activities]
        }
        if (favorites) {
            workingList = workingList.filter(activity => isFavorite(activity))
        }
        return workingList
    }

    const filteredActivities = getListItems()

    return (
        <PageFrame>
            <SectionHeader first title={"Activities"} >
                <Group noWrap>
                    <ActionIcon size="sm" onClick={ () => newActivity() } >
                        <IconPlus size={20} />
                    </ActionIcon>
                    <ActionIcon size="sm" onClick={ () => toggleScheduled() } >
                        <IconClock size={20} />
                    </ActionIcon>
                    <ActionIcon size="sm" onClick={ () => toggleFavorites() }  color={ favorites ? "primary" : "inherit" } >
                        <IconStar size={20} />
                    </ActionIcon>
                </Group>
            </SectionHeader>
            <SectionFrame padScroll>
                <SectionGrid>
                { filteredActivities.map(activity => 
                    <ActivityItem
                        endpointId={activity} 
                        key={activity}
                        select={selectActivity}
                        makeFavorite={makeFavorite}
                        delete={deleteActivityDefinition} 
                        scheduled = {showScheduled}
                    />
                )}
                </SectionGrid>
            </SectionFrame>
        </PageFrame>

    )
}

export default ActivitiesLayout;

