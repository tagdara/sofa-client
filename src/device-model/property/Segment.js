import React from 'react';
import { Button } from '@mantine/core';

const Segment = props => {

    return (
        <Button compact 
                variant="light"
                color="green"
                radius="lg"
                style={{ 
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    paddingRight: 8,
                }}
                size={props.size ? props.size : "sm"}>
            {props.value}
        </Button>
    )
}

export default Segment