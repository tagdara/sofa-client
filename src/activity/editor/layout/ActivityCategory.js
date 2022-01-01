import React from 'react';
import { Group } from '@mantine/core';

const ActivityCategory = props => {

    if (!props.children || props.children.length < 1) {
        return null
    }

    return (
        <Group direction="column" spacing={4}>
            { props.children }
        </Group>
    )
};

export default ActivityCategory
