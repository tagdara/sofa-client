import React from 'react';
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { IconShield, IconShieldOff } from '@tabler/icons';
import { ActionIcon } from '@mantine/core';
import dayjs from 'dayjs'

export default function HistoryLine(props) {    
    
    return (
        <SplitButtonGroup>
            <SplitButton>
                <ActionIcon variant="light" color={props.val==='NOT_DETECTED' ? 'green' : 'red' }>
                    { props.val==='NOT_DETECTED' ? <IconShield size={20} /> : <IconShieldOff size={20} /> }
                </ActionIcon>
            </SplitButton>
            <SplitButton 
                label={ dayjs(props.time).format(props.justTime ? "h:mm:ssa" : "ddd MMM D h:mm:ssa") } 
            />
        </SplitButtonGroup>
    );
}
