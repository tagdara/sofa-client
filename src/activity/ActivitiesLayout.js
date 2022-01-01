import React, { useState, useEffect } from 'react';

import { selectPage } from 'helpers/layoutHelpers';

import ActivityItem from 'activity/ActivityItem';
import { isFavorite, makeFavorite } from 'store/deviceHelpers';
import { loadActivities, deleteActivity } from 'store/activityHelpers';
import { ActionIcon, Group } from '@mantine/core';
import { Clock, Trash2, Star, Plus } from 'react-feather';

import SectionHeader from 'components/SectionHeader';
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import PageFrame from 'layout/PageFrame'
import HomeButton from 'layout/HomeButton';

const ActivitiesLayout = props => {

    const editing = false
    const [ activities, setActivities ] = useState([])
    const [ removing, setRemoving ] = useState(false)
    const [ favorites, setFavorites ] = useState(props.favorites)
    const [ showScheduled, setShowScheduled] = useState(false)

    useEffect(() => {
        loadActivities().then(result => { setActivities(result)})
    // eslint-disable-next-line 
    }, []);

    if (!activities) { return null }

    function deleteAndRefresh(activity) {
        deleteActivity(activity)
        loadActivities().then(result => { setActivities(result)})
    }

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
            workingList = workingList.filter(activity => isFavorite(activity.endpointId))
        }
        if (showScheduled) {
            workingList = workingList.filter(activity => activity.next_run )
        }
        return workingList
    }

    const activityList = getListItems()

    return (
        <PageFrame>
            <SectionHeader title={"Activities"} >
                <Group noWrap>
                    <ActionIcon size="sm" onClick={ () => newActivity() } >
                        <Plus size={20} />
                    </ActionIcon>
                    { Object.keys(activities).length>0 &&
                        <ActionIcon size="sm" onClick={ () => { setRemoving(!removing); }} >
                            <Trash2 size={20} />
                        </ActionIcon>             
                    }
                    <ActionIcon size="sm" onClick={ () => toggleScheduled() } >
                        <Clock size={20} />
                    </ActionIcon>
                    <ActionIcon size="sm" onClick={ () => toggleFavorites() }  color={ favorites ? "primary" : "inherit" } >
                        <Star size={20} />
                    </ActionIcon>
                </Group>
            </SectionHeader>
            <SectionFrame>
                <SectionGrid>
                { activityList && activityList.map(activity => 
                    <ActivityItem   endpointId={activity.endpointId} key={activity.endpointId}
                                    select={selectActivity}
                                    activity={ activity }
                                    makeFavorite={makeFavorite}
                                    edit={editing} delete={removing ? deleteAndRefresh : undefined} 
                                    showNextRun = {showScheduled}
                                />
                )}
                </SectionGrid>
            </SectionFrame>
            <SectionHeader>
                <HomeButton />
            </SectionHeader>
        </PageFrame>

    )
}

export default ActivitiesLayout;

