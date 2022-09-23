import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { IconShield, IconShieldOff } from '@tabler/icons';
import { ActionIcon } from '@mantine/core';

export default function HistoryLine(props) {    
    
    return (
        <SplitButtonGroup>
            <SplitButton>
                <ActionIcon variant="light" color={props.val==='NOT_DETECTED' ? 'green' : 'red' }>
                    { props.val==='NOT_DETECTED' ? <IconShield size={20} /> : <IconShieldOff size={20} /> }
                </ActionIcon>
            </SplitButton>
            <SplitButton 
                label={ 
                    <Moment format={ props.justTime ? "h:mm:ssa" : "ddd MMM D h:mm:ssa" }>
                        {props.time}
                    </Moment>
                } 
            />
        </SplitButtonGroup>
    );
}
