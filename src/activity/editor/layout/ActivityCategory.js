import React from 'react';
import { Stack } from '@mantine/core';

const ActivityCategory = props => {

    if (!props.children || props.children.length < 1) {
        return null
    }

    return (
        <Stack spacing={16}>
            { props.children }
        </Stack>
    )

};

export default ActivityCategory
