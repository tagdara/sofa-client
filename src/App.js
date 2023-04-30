import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import FrameGrid from 'layout/frame/FrameGrid';
import Login from 'login/Login';
import useLoginStore from 'login/loginStore';

export default function App() {

    const colorScheme = "dark"
    const loggedIn = useLoginStore(state => state.logged_in )

    return (
        <MantineProvider theme={{ colorScheme: colorScheme }}  withNormalizeCSS withGlobalStyles>
            <Notifications />
            { loggedIn ?
                <FrameGrid />
                :
                <Login />
            }
        </MantineProvider>
    );
}

