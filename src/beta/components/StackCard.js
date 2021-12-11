import React from 'react';
import { Card } from '@mantine/core'

const StackCard = props => {
    
    return (
        <Card padding="md" radius="md" style={{ width:"100%", maxWidth: 480, minWidth: 320 }}>
            { props.children }
        </Card >
    );
}

export default StackCard;

