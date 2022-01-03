import React from 'react';
import { Button } from '@mantine/core';

const Segment = props => {

    const cssColor = props.color && ( props.color.startsWith('#') || props.color.startsWith('rgb'))

    return (
        <Button compact 
                variant="light"
                style={{ backgroundColor: cssColor ? props.color : undefined }}
                color={ !cssColor && props.color ? props.color : "green" }
                radius="md"
                size={props.size ? props.size : "sm"}>
            {props.value}
        </Button>
    )
}

export default Segment