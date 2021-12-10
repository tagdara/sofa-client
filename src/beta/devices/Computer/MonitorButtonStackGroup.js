import React from 'react';
import MonitorButtonStack from 'beta/devices/Computer/MonitorButtonStack';
import MonitorButtonStackLabel from 'beta/devices/Computer/MonitorButtonStackLabel';
import { Group, Space } from '@mantine/core';

export default function MonitorButtonStackGroup(props) {

    if (!props.buttonLayout) { return null }

    const sectionCount = Object.keys(props.buttonLayout).length;

    return (
        <Group grow spacing={2}>
            <MonitorButtonStackLabel outlets={props.outlets} topClick={props.topClick} bottomClick={ props.bottomClick } />
            { Object.keys(props.buttonLayout).map( (zone, i) => 
                <React.Fragment key={zone}>
                    { props.buttonLayout[zone].map( btn =>
                        <MonitorButtonStack key={btn.label} {...btn} />
                    )}
                    { i < sectionCount &&
                        <Space size="xs"/>
                    }
                </React.Fragment>
            )}
        </Group>
    );
}
 