import React from 'react';
import PropertyValue from 'activity/editor/PropertyValue';
import DeviceDirective from 'activity/editor/DeviceDirective';
import ActivityDevice from 'activity/editor/device/ActivityDevice';
import useActivityEditorStore from "activity/editor/activityEditorStore"
import { Divider, Group, Timeline} from '@mantine/core';
import ActivityActionMenu from 'activity/editor/action/ActivityActionMenu'
import { removeActivityItem, moveActivityItemDown, moveActivityItemUp } from 'activity/editor/activityEditorHelpers'

const ActivityActions = props => {

    //const [ removing, setRemoving ] = useState(false)
    //const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.actions)
    //const name = "Actions"
    const category = "actions"
    const mobile = false
    //const count = items ? items.length : 0

    const itemAction = (action, index) => {
        console.log('action', action, category, index)
        if (action === "delete") { removeActivityItem(category, index) }
        if (action === "up") { moveActivityItemUp(category, index) }
        if (action === "down") { moveActivityItemDown(category, index) }
    }


    return (
        <>
        { (items && items.length >0) && <Divider style={{ width: "100%"}} />}
        <Timeline  bulletSize={28} lineWidth={2}>
            { items && items.map( (item,index) =>
                <Timeline.Item 
                    key={index}
                    bullet = {  <ActivityActionMenu index={index} select={itemAction} endpointId={item.endpointId} />}
                    title={ mobile ? <ActivityDevice compact={true} category={category} index={index} /> : null }
                >
                    <Group spacing={2}>
                        { !mobile && <ActivityDevice compact={true} category={category} index={index} /> }
                        <DeviceDirective compact={true} category={category } index={index}  />
                        <PropertyValue compact={true} category={ category } index={index} />
                    </Group>
                </Timeline.Item>
            )}
        </Timeline>
        </>
    )

};

export default ActivityActions
