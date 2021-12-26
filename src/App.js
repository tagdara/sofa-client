import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import FrameGrid from 'layout/FrameGrid';
import Login from 'login/Login';
import useLoginStore from 'store/loginStore';

export default function App() {

    const colorScheme = "dark"
    const loggedIn = useLoginStore(state => state.logged_in )

    return (
        <MantineProvider theme={{ colorScheme: colorScheme }}>
            <NotificationsProvider>
                { loggedIn ?
                    <FrameGrid />
                    :
                    <Login />
                }
            </NotificationsProvider>
        </MantineProvider>
    );
}

