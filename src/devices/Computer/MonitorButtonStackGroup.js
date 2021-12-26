import React from 'react';
import MonitorButtonStack from 'devices/Computer/MonitorButtonStack';
import { Group, Space } from '@mantine/core';

export default function MonitorButtonStackGroup(props) {

    if (!props.buttonLayout) { return null }

    const sectionCount = Object.keys(props.buttonLayout).length;

    return (
        <Group direction="row" noWrap spacing={4} position="apart" style={{ width: "100%"}}>
            { Object.keys(props.buttonLayout).map( (zone, i) => 
                <Group key={zone} noWrap spacing="xs">
                    { props.buttonLayout[zone].map( btn =>
                        <MonitorButtonStack key={btn.label} {...btn} />
                    )}
                    { i < sectionCount &&
                        <Space size="xs"/>
                    }
                </Group>
            )}
        </Group>
    );
}
 