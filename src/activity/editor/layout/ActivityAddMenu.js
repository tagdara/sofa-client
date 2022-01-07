import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { Plus } from 'react-feather'
import { addActivityItem } from 'store/activityEditorHelpers'

const ActivityAddMenu = props => {

    function addAction() {
        const newItem={
            "type": "command",
            "endpointId": undefined,
            "controller": undefined,
            "command": undefined,
            "deviceName": undefined
        }
        addActivityItem('action', newItem)
    }

    function addTrigger() {
        const newItem={
            "type": "property",
            "endpointId": undefined,
            "value": undefined,
            "propertyName": undefined,
            "controller": undefined,
            "deviceName": undefined
        }
        addActivityItem('trigger', newItem)
    }

    function addCondition() {
        const newItem = {
            "type": "property",
            "endpointId": undefined,
            "value": undefined,
            "propertyName": undefined,
            "controller": undefined,
            "deviceName": undefined
        }        
        addActivityItem('condition', newItem)
    }

    return (
        <Menu control={ <ActionIcon variant="light" size="md"><Plus size={20} /></ActionIcon> }>
            <Menu.Item onClick={ addAction } icon={<Plus size={16} />}>Action</Menu.Item>
            <Menu.Item onClick={ addCondition } icon={<Plus size={16} />}>Condition</Menu.Item>
            <Menu.Item onClick={ addTrigger } icon={<Plus size={16} />}>Trigger</Menu.Item>
        </Menu>
    );
}

export default ActivityAddMenu