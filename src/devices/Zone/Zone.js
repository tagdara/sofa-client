import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

import Moment from 'react-moment';
import 'moment-timezone';
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { ActionIcon } from '@mantine/core';
import useDetectionState from 'endpoint-model/property/detectionState/useDetectionState'
import { IconShield, IconAlertTriangle } from '@tabler/icons';

const Zone = props => {

    const { detectionStateBool: open } = useDetectionState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId)

    function historyZone(name, endpointId) {
        selectPage('HistoryPage', {"endpointId": props.endpointId, "property":"detectionState"})
    }

    return (
        <SplitButtonGroup >
            <SplitButton onClick={ () => historyZone() } >
                <ActionIcon size="md" variant="light" color={open ? "red" : "green"}>
                    { open ? < IconAlertTriangle size={20} /> : <IconShield size={20} /> }
                </ActionIcon>     
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { props.changeTime!=='Unknown' && <Moment format="ddd MMM D h:mm:sa">{props.changeTime}</Moment> } 
            />
        </SplitButtonGroup>
    )

}

export default Zone;
