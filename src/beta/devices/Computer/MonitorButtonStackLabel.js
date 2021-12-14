import React from 'react';
import { ActionIcon, } from '@mantine/core';
import { Monitor } from 'react-feather'

const MonitorButtonStackLabel = props => {

    return (
        <ActionIcon size="lg" onClick={ props.topClick } >
            <Monitor size={20} />
        </ActionIcon>
    );
}

export default MonitorButtonStackLabel;
