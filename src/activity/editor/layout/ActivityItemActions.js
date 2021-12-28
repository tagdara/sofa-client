import React from 'react';
import { ChevronUp, X as Clear, ChevronDown } from 'react-feather'
import { ActionIcon, Group } from '@mantine/core';

import { moveActivityItemUp, moveActivityItemDown, removeActivityItem } from 'store/activityEditorHelpers'


const ActivityItemActions = props => {

    return (
        <Group noWrap style={{maxWidth: 64}}>
            { props.removing &&
                <ActionIcon size="small" onClick={() => removeActivityItem(props.category, props.index)}><Clear size={20} /></ActionIcon>     
            }
            { (props.reordering) &&
                <ActionIcon disabled={props.index < 1 } size="small" onClick={() => moveActivityItemUp(props.category, props.index)}><ChevronUp size={20} /></ActionIcon>
            }
            { (props.reordering) &&
                <ActionIcon size="small" disabled={props.index > props.count-1} onClick={() => moveActivityItemDown(props.category, props.index)}><ChevronDown size={20} /></ActionIcon>
            }
        </Group>
    )
}

export default ActivityItemActions