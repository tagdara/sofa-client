import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import ActivityTriggers from "activity/editor/trigger/ActivityTriggers"
import ActivityConditions from "activity/editor/condition/ActivityConditions"
import ActivityActions from "activity/editor/action/ActivityActions"
import ActivitySchedules from "activity/editor/schedule/ActivitySchedules"

import ActivityHeader from "activity/editor/layout/ActivityHeader"
import ActivitySave from "activity/editor/layout/ActivitySave"
import { loadActivity, newActivity } from 'store/activityEditorHelpers';


export default function ActivityEditor(props) {

    useEffect(() => {
        if (props.endpointId !== undefined) {
            loadActivity(props.endpointId)
        } else {
            newActivity()
            console.log('This is a blank automation.')
        }
    // eslint-disable-next-line
    }, [ props.endpointId ]);

    return (
        <Grid item xs={12} sx={{ position: "relative"}}>
            <ActivityHeader />
            <ActivitySchedules />
            <ActivityTriggers />
            <ActivityConditions />
            <ActivityActions />
            <ActivitySave />
        </Grid>
    )
};
