import React from 'react';
import { Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDidUpdate } from '@mantine/hooks';
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

    useDidUpdate(() => {
        // Name lags on the json load, but we cant skip undefined in the case of new activities
        form.setFieldValue('name', name)
    }, [ name ])


    function edit(newName) {
        const currentActivity = useActivityEditorStore.getState().activity
        console.log('setting name to ', newName)
        useActivityEditorStore.setState({ activity: { ...currentActivity, name: newName }})
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