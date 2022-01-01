import React  from 'react';

import { Group, Title } from '@mantine/core';
import { usePageFrame } from 'helpers/usePageFrame'

const SectionHeader = props => {

    const { stacksWidth} = usePageFrame()

    return (    
        <Group noWrap style={{ flexShrink: 0, overflow: "hidden", margin: "0 auto", width: "100%", maxWidth: stacksWidth }} position="apart">
            { props.title && <Title order={3} >{props.title}</Title> }
            {props.children}
        </Group>

    )
}

export default SectionHeader;
