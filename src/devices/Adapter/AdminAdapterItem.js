import React from 'react';
import { ActionIcon } from '@mantine/core'
import { Layers, RotateCcw } from 'react-feather'
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'

export default function AdapterItem(props) { 

    return (
        <SplitButtonGroup onClick={ () => props.restartAdapter(props.adapter.name)}>
            <SplitButton >
                <ActionIcon>
                    <Layers size={20} />
                </ActionIcon>               
            </SplitButton>
            <SplitButton  label={ props.adapter.name } />
            <SplitButton>
                <ActionIcon>
                    <RotateCcw size={20} />
                </ActionIcon>
            </SplitButton>
        </SplitButtonGroup>
    );
}

