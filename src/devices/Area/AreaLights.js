import React from 'react';
import LightLine from 'devices/Light/LightLine';
import { Divider, Group } from '@mantine/core'

const AreaLights = props => {

    if (!props.lights || props.lights.length<1 ) { return null }

    return (
        <Group direction="column" noWrap grow style={{ width: "100%"}} spacing="xs">
            <Divider variant="dashed" label="Lights" />
            { props.lights.map( light =>
                <LightLine key={light} endpointId={light} skipPrefix={props.name} />
            )}
        </Group>
    );

}

export default AreaLights
