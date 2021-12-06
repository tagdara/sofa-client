import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import FrameGrid from 'beta/layout/FrameGrid';

export default function AppFram() {

    const colorScheme = "dark"

    return (
        <MantineProvider theme={{ colorScheme: colorScheme }}>
            <NotificationsProvider>
                <FrameGrid />
            </NotificationsProvider>
        </MantineProvider>
    );
}

