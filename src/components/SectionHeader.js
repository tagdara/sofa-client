import React  from 'react';

import { Group, Title } from '@mantine/core';
import { usePageFrame } from 'device-model/instance/PageFrame'

const SectionHeader = props => {

    const { stacksWidth} = usePageFrame()

    return (    
        <Group noWrap style={{ margin: "0 auto", width: "100%", maxWidth: stacksWidth }} position="apart">
            <Title order={3} >{props.title}</Title>
            <Group noWrap>
                {props.children}
            </Group>
        </Group>

    )
}

export default SectionHeader;
