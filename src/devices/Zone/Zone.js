import React from 'react';
//import { selectPage } from 'helpers/layoutHelpers';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import { Stack, Text, Button} from '@mantine/core';
import useDetectionState from 'endpoint-model/property/detectionState/useDetectionState'
import { IconShield, IconAlertTriangle } from '@tabler/icons';

const Zone = props => {

    const { detectionStateBool: open } = useDetectionState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId)

    //function historyZone(name, endpointId) {
    //    selectPage('HistoryPage', {"endpointId": props.endpointId, "property":"detectionState"})
    //}

    return (
            <Button 
                radius={"md"}
                size="md"
                styles={{ 
                    root: {
                        minHeight: 56,
                        border: 0,
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingLeft: 16,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    },
                    leftIcon: {
                        marginRight: 24,
                    },
                }}
                variant={ open ? "light" : "default" }
                color={ open ? "red" : "primary" }
                fullWidth 
                leftIcon={ open ? < IconAlertTriangle size={20} /> : <IconShield size={20} /> }
            >
                <Stack spacing={0}>
                    <Text size="sm">{ name }</Text>
                    <Text size="xs" color={"dimmed"}>{ props.changeTime!=='Unknown' && props.changeTime }</Text>
                </Stack>
            </Button>            
    )


}

export default Zone;
