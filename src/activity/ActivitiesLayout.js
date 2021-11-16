import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { selectPage } from 'store/layoutHelpers'

import ActivityItem from 'activity/ActivityItem';
import GridSection from 'components/GridSection';

import { isFavorite, makeFavorite } from 'store/deviceHelpers';
import { loadActivities, deleteActivity } from 'store/activityHelpers';

const ActivitiesLayout = props => {

    const [ activities, setActivities ] = useState([])
    const editing = false
    const [remove, setRemove] = useState(false)
    const [favorites, setFavorites] = useState(props.favorites)
    const [scheduled, setScheduled] = useState(false)

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
        setScheduled(!scheduled)
        if (!scheduled) {
            setFavorites(false)
        }
    }

    const activityList = favorites ? activities.filter(activity => isFavorite(activity.endpointId)) : activities 


    return (    
        <>
            <GridSection scroll={true} name={"Activities"} secondary={
                <>
                    <IconButton onClick={ () => newActivity() } >
                        <AddIcon fontSize="small" />
                    </IconButton>
                        { Object.keys(activities).length>0 &&
                        <IconButton color={ remove ? "primary" : "inherit" } onClick={ () => { setRemove(!remove); }} >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        }
                    <IconButton onClick={ () => toggleScheduled() } >
                        <ScheduleIcon color={ scheduled ? "primary" : "inherit" } fontSize="small" />
                    </IconButton>
                    <Button color={ !favorites ? "primary" : "inherit" } onClick={ () => toggleFavorites() }>ALL</Button>
                </> }
            >
            { activityList && activityList.map(activity => 
                <ActivityItem   endpointId={activity.endpointId} key={activity.endpointId}
                                select={selectActivity}
                                activity={ activity }
                                makeFavorite={makeFavorite} deleting={remove} 
                                edit={editing} delete={deleteActivity} 
                            />
            )}
            </GridSection>
        </>
    )
}

export default ActivitiesLayout;

