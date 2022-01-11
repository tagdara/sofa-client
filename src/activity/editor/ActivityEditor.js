import React, { useEffect } from 'react';
import ActivityTriggers from "activity/editor/trigger/ActivityTriggers"
import ActivityConditions from "activity/editor/condition/ActivityConditions"
import ActivityActions from "activity/editor/action/ActivityActions"
import ActivitySchedules from "activity/editor/schedule/ActivitySchedules"
import ActivityHeader from "activity/editor/layout/ActivityHeader"
import ActivityFooter from "activity/editor/layout/ActivityFooter"
import { loadActivity, newActivity } from 'store/activityEditorHelpers';

import SectionFrame from 'layout/SectionFrame'
import PageFrame from 'layout/PageFrame'
import { Group } from '@mantine/core';

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
        <PageFrame>
            <ActivityHeader />
            <SectionFrame>
                <Group direction={"column"} style={{ width: "100%"}}>
                    <ActivitySchedules />
                    <ActivityTriggers />
                    <ActivityConditions />
                    <ActivityActions />
                </Group>
            </SectionFrame>
            <ActivityFooter />
        </PageFrame>
    )
    //          <ActivitySchedules wide={wide} />
    //        <ActivityTriggers wide={wide} />
    //        <ActivityConditions wide={wide} />
    //        <ActivityActions wide={wide} />
    //        <ActivitySave wide={wide} />

    //)
};
