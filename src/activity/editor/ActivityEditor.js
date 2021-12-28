import React, { useEffect } from 'react';

import { Group } from '@mantine/core';
import ActivityTriggers from "activity/editor/trigger/ActivityTriggers"
import ActivityConditions from "activity/editor/condition/ActivityConditions"
import ActivityActions from "activity/editor/action/ActivityActions"
//import ActivitySchedules from "activity/editor/schedule/ActivitySchedules"

import ActivityHeader from "activity/editor/layout/ActivityHeader"
//import ActivitySave from "activity/editor/layout/ActivitySave"
import { loadActivity, newActivity } from 'store/activityEditorHelpers';
import { PageFrame } from 'device-model/instance/PageFrame'

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
        <Group direction="column">
            <PageFrame cols={1}>
                <ActivityHeader />
                <ActivityTriggers />
                <ActivityConditions />
                <ActivityActions />
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
