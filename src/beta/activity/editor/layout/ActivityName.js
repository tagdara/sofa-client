import React from 'react';
import { Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';

import useActivityEditorStore from 'store/activityEditorStore';

const ActivityName = props => {

    const name = useActivityEditorStore( state => state.activity.name )
    const form = useForm({
        initialValues: {
            name: name ? name : "",
        },
    
        validationRules: {
            name: (value) => value.length > 2,
        },
    });

    if (!name && !props.new) { return null }
 
    function edit(newName) {
        useActivityEditorStore.setState({ activity: { name: newName }})
    }

    return (    
        <Group noWrap position="apart" spacing="xl" style={{width: "100%", alignItems: "end"}} >
            <form style={{ flexGrow: 1 }} onSubmit={form.onSubmit((values) => edit(values.name))}>
                <TextInput  label="Activity Name" 
                            placeholder="Descriptive name"
                            required
                            {...form.getInputProps('name')} 
                    />
            </form>
            {props.children}
        </Group>
    )
};

export default ActivityName