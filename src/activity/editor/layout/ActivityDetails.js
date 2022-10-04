import React from 'react';
import { Badge, Group, Text } from '@mantine/core';
import dayjs from 'dayjs'
import useActivityEditorStore from 'activity/editor/activityEditorStore'

const ActivityDetails = props => {
  
    const endpointId = useActivityEditorStore( state => state.endpointId )
    const storeLastRun = useActivityEditorStore( state => state.activity.last_run )

    const lastRun = storeLastRun && storeLastRun.toLowerCase() !== 'never' ? dayjs(storeLastRun).calendar() : undefined

    return (    
        <Group noWrap position="apart" spacing="xl" style={{width: "100%", alignItems: "end"}} >
            <Badge variant="light" color="gray">{endpointId ? endpointId : "New Activity"}</Badge>
            <Group noWrap>
                <Text size="xs" lineClamp={1}>{lastRun}</Text>
            </Group>
        </Group>
    )
};

export default ActivityDetails