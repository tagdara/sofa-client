import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { Plus } from 'react-feather'
import { addActivityItem } from 'activity/editor/activityEditorHelpers'

const ActivityAddMenu = props => {

    function addAction() {
        const newItem={
            "type": "command",
            "endpointId": undefined,
            "controller": undefined,
            "command": undefined,
        }
        addActivityItem('actions', newItem)
    }

    function addTrigger() {
        const newItem={
            "type": "property",
            "endpointId": undefined,
            "value": undefined,
            "propertyName": undefined,
            "controller": undefined,
        }
        addActivityItem('triggers', newItem)
    }

    function addCondition() {
        const newItem = {
            "type": "property",
            "endpointId": undefined,
            "value": undefined,
            "propertyName": undefined,
            "controller": undefined,
        }        
        addActivityItem('conditions', newItem)
    }

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="light" size="md"><Plus size={20} /></ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={ addAction } icon={<Plus size={16} />}>Action</Menu.Item>
                <Menu.Item onClick={ addCondition } icon={<Plus size={16} />}>Condition</Menu.Item>
                <Menu.Item onClick={ addTrigger } icon={<Plus size={16} />}>Trigger</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default ActivityAddMenu