import React, { useEffect } from 'react';

import Stack from '@mui/material/Stack';
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

    const wide = window.innerWidth > 799

    return (
        <Stack spacing={1} sx={{ padding: 2, position: "relative", width: "100%", maxWidth: 1200 }}>
            <ActivityHeader wide={wide} />
            <ActivitySchedules wide={wide} />
            <ActivityTriggers wide={wide} />
            <ActivityConditions wide={wide} />
            <ActivityActions wide={wide} />
            <ActivitySave wide={wide} />
        </Stack>
    )
};
