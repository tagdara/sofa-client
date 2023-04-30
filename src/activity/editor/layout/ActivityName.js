import React from 'react';
import { Group, TextInput } from '@mantine/core';
import useActivityEditorStore from 'activity/editor/activityEditorStore';

const ActivityName = props => {

    const name = useActivityEditorStore( state => state.activity.name )

    function edit(newName) {
        const currentActivity = useActivityEditorStore.getState().activity
        useActivityEditorStore.setState({ activity: { ...currentActivity, name: newName }})
    }

    return (    
        <Group noWrap position="apart" spacing="xl" style={{width: "100%", alignItems: "end"}} >
            <TextInput  label="Activity Name" 
                            placeholder="Descriptive name"
                            required
                            value={name}
                            style={{ width: "100%"}}
                            onChange={(event) => edit(event.currentTarget.value)} 
            />
            {props.children}
        </Group>
    )
};

export default ActivityName