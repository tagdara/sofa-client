import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { friendlyNameByEndpointId } from 'store/deviceHelpers'

import Moment from 'react-moment';
import 'moment-timezone';

import { Shield, AlertTriangle } from 'react-feather'
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import { ActionIcon } from '@mantine/core';
import useDetectionState from 'device-model/property/detectionState/useDetectionState'

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
                    { open ? < AlertTriangle size={20} /> : <Shield size={20} /> }
                </ActionIcon>     
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { props.changeTime!=='Unknown' && <Moment format="ddd MMM D h:mm:sa">{props.changeTime}</Moment> } 
            />
        </SplitButtonGroup>
    )

}

export default Zone;
