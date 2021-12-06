import React from 'react';
import { Group, Title } from '@mantine/core'

const FrameNavTitle = props => {

    return (
        <Group position="apart" noWrap sx={{ paddingLeft: 12, paddingBottom: 8 }}>
            <Title order={4}>{props.title}</Title>
            { props.children }
        </Group>
    )
    
}

export default FrameNavTitle