import React, { useState } from 'react';
import { Button, Group, PasswordInput, Popover, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

const PinPopover = props => {
    
    const form = useForm({
        initialValues: {
            password: ''
        },

        validationRules: {
            password: (value) => value.length === 4,
        },
    });

    console.log('opened', props.opened)

    return (
        <Popover
            opened={props.opened}
            onClose={props.close}
            target={ props.target }
            position="bottom"
            styles={{ body: { width: 260 } }}
            withArrow
        >
            <form onSubmit={form.onSubmit((values) => props.submitPin(values.password))}>
                <Stack grow>
                    <PasswordInput  required
                                            size="sm" 
                                            label="PIN" 
                                            placeholder="4 digits" 
                                            {...form.getInputProps('password')} 
                                            maxLength={4}
                                            inputMode='numeric'
                                            pattern='[0-9]*'
                    />
                    <Button fullWidth type = "submit">
                        Go
                    </Button>
                </Group>
            </form>
        </Popover>
    );
}

export default PinPopover

//<form onSubmit={form.onSubmit((values) => props.submitPin(values.password))}>
//<Stack grow>
//    <SecurityCamera wide={true} camera={props.device.endpointId} selectButtons={false} directive={props.directive} />
//    <PasswordInput  required
//                            size="sm" 
//                            label="PIN" 
//                            placeholder="4 digits" 
//                            {...form.getInputProps('password')} 
//                            maxLength={4}
//                            inputMode='numeric'
//                            pattern='[0-9]*'
//    />
//    <Button fullWidth type = "submit">
//        Go
//    </Button>
//</Group>
//</form>