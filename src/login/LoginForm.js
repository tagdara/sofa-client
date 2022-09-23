import React from 'react';

import { Button, Stack, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useLoginStore from 'login/loginStore';

export default function Login(props) {

    const login = useLoginStore( state => state.login )
    const loginMessage = useLoginStore( state => state.login_message )
    const userName = useLoginStore( state => state.name )

    const form = useForm({
        initialValues: {
            user: userName ? userName : "",
            password: ''
        },
    
        validationRules: {
            user: (value) => value.length > 2,
            password: (value) => value.length > 2,
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => login(values.user, values.password))}>
            <Stack>
                <TextInput  label="Username" 
                            placeholder="Your user name"
                            required
                            {...form.getInputProps('user')} 
                />
                <PasswordInput  required
                                size="sm" 
                                label="Password" 
                                placeholder="Your password" 
                                {...form.getInputProps('password')} 
                />
                <Text style={{minHeight: 24}}>{loginMessage}</Text>
                <Button fullWidth type = "submit">
                    Login
                </Button>
            </Stack>
        </form>
    )
};