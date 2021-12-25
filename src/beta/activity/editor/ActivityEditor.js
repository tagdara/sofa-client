import React, { useEffect } from 'react';

import { Group } from '@mantine/core';
//import ActivityTriggers from "beta/activity/editor/trigger/ActivityTriggers"
//import ActivityConditions from "beta/activity/editor/condition/ActivityConditions"
import ActivityActions from "beta/activity/editor/action/ActivityActions"
//import ActivitySchedules from "beta/activity/editor/schedule/ActivitySchedules"

import ActivityHeader from "beta/activity/editor/layout/ActivityHeader"
//import ActivitySave from "beta/activity/editor/layout/ActivitySave"
import { loadActivity, newActivity } from 'store/activityEditorHelpers';
import { PageFrame } from 'beta/components/PageFrame'

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
        <Group direction="column">
            <PageFrame cols={1}>
                <ActivityHeader wide={wide} />
                <ActivityActions wide={wide} />
            </PageFrame>
        </Group>
    )
    //          <ActivitySchedules wide={wide} />
    //        <ActivityTriggers wide={wide} />
    //        <ActivityConditions wide={wide} />
    //        <ActivityActions wide={wide} />
    //        <ActivitySave wide={wide} />

    //)
};
