import React from 'react';
import { Button, Card, Stack, Text } from '@mantine/core';
import { reloadPWA } from 'network/reloadPWA'

export default function LoginReload(props) {
    
    return (
        <Card>
            <Stack>
                <Text>{"Attempting to connect"} </Text >
                <Button color="primary" fullWidth onClick={ ()=> reloadPWA()}>
                    RELOAD
                </Button>
            </Stack>
        </Card>
    )
};