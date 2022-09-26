import React from 'react';
import { ActionIcon } from '@mantine/core'
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { IconRefresh, IconStack } from '@tabler/icons';

export default function AdapterItem(props) { 

    return (
        <SplitButtonGroup onClick={ () => props.restartAdapter(props.adapter.name)}>
            <SplitButton >
                <ActionIcon>
                    <IconStack size={20} />
                </ActionIcon>               
            </SplitButton>
            <SplitButton  label={ props.adapter.name } />
            <SplitButton>
                <ActionIcon>
                    <IconRefresh size={20} />
                </ActionIcon>
            </SplitButton>
        </SplitButtonGroup>
    );
}

