import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Star';

import { selectPage } from 'store/layoutHelpers'

import ActivityItem from 'activity/ActivityItem';
import GridSection from 'components/GridSection';

import { isFavorite, makeFavorite } from 'store/deviceHelpers';
import { loadActivities, deleteActivity } from 'store/activityHelpers';

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

    function selectActivity(activity) {
        console.log('selecting', activity)
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
        console.log('act', activities)
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
            <GridSection scroll={true} name={"Activities"} secondary={
                <div>
                    <IconButton onClick={ () => newActivity() } >
                        <AddIcon fontSize="small" />
                    </IconButton>
                        { Object.keys(activities).length>0 &&
                        <IconButton color={ removing ? "primary" : "inherit" } onClick={ () => { setRemoving(!removing); }} >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        }
                    <IconButton onClick={ () => toggleScheduled() } >
                        <ScheduleIcon color={ showScheduled ? "primary" : "inherit" } fontSize="small" />
                    </IconButton>
                    <IconButton color={ favorites ? "primary" : "inherit" } onClick={ () => toggleFavorites() }><FavoriteIcon/></IconButton>
                </div> }
            >
            { activityList && activityList.map(activity => 
                <ActivityItem   endpointId={activity.endpointId} key={activity.endpointId}
                                select={selectActivity}
                                activity={ activity }
                                makeFavorite={makeFavorite}
                                edit={editing} delete={removing ? deleteActivity : undefined} 
                                showNextRun = {showScheduled}
                            />
            )}
            </GridSection>
    )
}

export default ActivitiesLayout;

