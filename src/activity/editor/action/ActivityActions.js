import React from 'react';
import PropertyValue from 'activity/editor/PropertyValue';
import DeviceDirective from 'activity/editor/DeviceDirective';
import ActivityDevice from 'activity/editor/ActivityDevice';
import useActivityEditorStore from "store/activityEditorStore"
import { Group, Timeline} from '@mantine/core';
import DeviceIcon from 'components/DeviceIcon'

const ActivityActions = props => {

    //const [ removing, setRemoving ] = useState(false)
    //const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.actions)
    //const name = "Actions"
    const category = "actions"
    //const count = items ? items.length : 0

    return (
        <Timeline  bulletSize={28} lineWidth={2}>
            { items && items.map( (item,index) =>
                <Timeline.Item 
                    key={index}
                    bullet={<DeviceIcon color="red" size={16} endpointId={item.endpointId} />}
                    title={<ActivityDevice compact={true} category={category} index={index} />}
                >
                    <Group spacing={2}>
                        <DeviceDirective compact={true} category={category } index={index}  />
                        <PropertyValue compact={true} category={ category } index={index} />
                    </Group>
                </Timeline.Item>
            )}
        </Timeline>
    )

};

export default ActivityActions
