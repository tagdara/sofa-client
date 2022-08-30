import React, { useEffect } from 'react';

import LoginReload from 'login/LoginReload';
import LoginForm from 'login/LoginForm';
import useLoginStore from 'store/loginStore';
import AppFrame from 'components/AppFrame';

import { Card, Space, Stack, Title } from '@mantine/core';

export default function Login(props) {

    const refreshToken = useLoginStore(state => state.refresh_token)
    const checkToken = useLoginStore( state => state.checkToken )
    const userName = useLoginStore( state => state.name )

    useEffect(() => {
        checkToken(userName, refreshToken)
    // eslint-disable-next-line         
    }, [])    


    return (
        <AppFrame padding="sm">
            <Stack>
                <Space h="lg" style={{ paddingTop: "calc(16px + env(safe-area-inset-top))" }} />
                <Card sx={{ minWidth: 300, maxWidth: 480, margin: "auto" }} shadow="sm" padding="sm">
                    <Title order={3} align="center">Home</Title>
                </Card>
                <Card sx={{ minWidth: 300, maxWidth: 480, margin: "auto" }} shadow="sm" padding="sm">
                    { refreshToken != null && <LoginReload /> }
                    <LoginForm />
                </Card>
            </Stack>
        </AppFrame>
    )
};