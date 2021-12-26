import React from 'react';
import { Plus, Minus, Shuffle } from 'react-feather'
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
                    <Plus size={20} />
                </ActionIcon>
            }
            { (props.setRemoving && props.count > 0 ) &&
                <ActionIcon size="small" onClick={remove} >
                    <Minus size={20} />
                </ActionIcon>
            }
            { (props.setReordering !== undefined && props.count > 1) &&
                <ActionIcon size="small" onClick={reorder}>
                    <Shuffle size={20} />
                </ActionIcon>
            }
        </Group>
    )
};

export default ActivitySectionButtons