import React, { useEffect } from 'react';

import LoginReload from 'beta/login/LoginReload';
import LoginForm from 'beta/login/LoginForm';
import useLoginStore from 'store/loginStore';

import { AppShell, Card, Group, Space, Title } from '@mantine/core';

export default function Login(props) {

    const refreshToken = useLoginStore(state => state.refresh_token)
    const checkToken = useLoginStore( state => state.checkToken )
    const setLoginMessage = useLoginStore( state => state.setLoginMessage )
    const userName = useLoginStore( state => state.name )

    useEffect(() => {
        setLoginMessage('Checking token')
        checkToken(userName, refreshToken)
    // eslint-disable-next-line         
    }, [])    


    return (
        <AppShell padding="sm">
            <Group direction="column" grow noWrap>
                <Space h="lg" style={{ paddingTop: "calc(16px + env(safe-area-inset-top))" }} />
                <Card sx={{ minWidth: 300, maxWidth: 480, margin: "auto" }} shadow="sm" padding="sm">
                    <Title order={3} align="center">Home</Title>
                </Card>
                <Card sx={{ minWidth: 300, maxWidth: 480, margin: "auto" }} shadow="sm" padding="sm">
                    { refreshToken != null && <LoginReload /> }
                    <LoginForm />
                </Card>
            </Group>
        </AppShell>
    )
};