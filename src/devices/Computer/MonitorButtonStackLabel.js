import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconDeviceDesktop } from '@tabler/icons';

const MonitorButtonStackLabel = props => {

    return (
        <ActionIcon size="lg" onClick={ props.topClick } >
            <IconDeviceDesktop size={20} />
        </ActionIcon>
    );
}

export default MonitorButtonStackLabel;
