import React from 'react';
import { IconPlus, IconMinus, IconSwitchVertical } from '@tabler/icons';
import { ActionIcon, Group } from '@mantine/core';

const ActivitySectionButtons = props => {

    function reorder() {
        props.setReordering(!props.reordering)
        props.setRemoving(false)
    }

    function remove() {
        props.setRemoving(!props.removing)
        props.setReordering(false)
    }

    return (    
        <Group noWrap>
            { props.add &&
                <ActionIcon size="small" onClick={props.add} >
                    <IconPlus size={20} />
                </ActionIcon>
            }
            { (props.setRemoving && props.count > 0 ) &&
                <ActionIcon size="small" onClick={remove} >
                    <IconMinus size={20} />
                </ActionIcon>
            }
            { (props.setReordering !== undefined && props.count > 1) &&
                <ActionIcon size="small" onClick={reorder}>
                    <IconSwitchVertical size={20} />
                </ActionIcon>
            }
        </Group>
    )
};

export default ActivitySectionButtons