import React from 'react';
import MonitorButtonStack from 'devices/Computer/MonitorButtonStack';
import { Group } from '@mantine/core';

export default function MonitorButtonStackGroup(props) {

    if (!props.buttonLayout) { return null }

    return (
        <Group direction="row" noWrap spacing={4} position="apart" style={{ width: "100%"}}>
            { Object.keys(props.buttonLayout).map( (zone, i) => 
                <Group key={zone} noWrap spacing={3}> 
                    { props.buttonLayout[zone].map( btn =>
                        <MonitorButtonStack set={zone} key={btn.label} {...btn} />
                    )}
                </Group>
            )}
        </Group>
    );
}
 