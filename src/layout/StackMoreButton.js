import React from 'react';
import { Badge } from '@mantine/core';

const StackMoreButton = props => {

    return (
        <Badge>{ !props.expand ? "More" : "Less" } </Badge>
    );
}

export default StackMoreButton;
