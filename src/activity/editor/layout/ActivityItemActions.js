import React from 'react';
import { IconChevronUp, IconX, IconChevronDown } from '@tabler/icons';
import { ActionIcon, Group } from '@mantine/core';

import { moveActivityItemUp, moveActivityItemDown, removeActivityItem } from 'activity/editor/activityEditorHelpers'


const ActivityItemActions = props => {

    return (
        <Group noWrap style={{maxWidth: 64}}>
            { props.removing &&
                <ActionIcon size="small" onClick={() => removeActivityItem(props.category, props.index)}><IconX size={20} /></ActionIcon>     
            }
            { (props.reordering) &&
                <ActionIcon disabled={props.index < 1 } size="small" onClick={() => moveActivityItemUp(props.category, props.index)}><IconChevronUp size={20} /></ActionIcon>
            }
            { (props.reordering) &&
                <ActionIcon size="small" disabled={props.index > props.count-1} onClick={() => moveActivityItemDown(props.category, props.index)}><IconChevronDown size={20} /></ActionIcon>
            }
        </Group>
    )
}

export default ActivityItemActions