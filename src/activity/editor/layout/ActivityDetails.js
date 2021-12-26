import React from 'react';
import { directive  } from 'store/directive';
import { Badge, Group, ActionIcon, Text } from '@mantine/core';
import { Play, FastForward } from 'react-feather'
import moment from 'moment';
import useActivityEditorStore from 'store/activityEditorStore'

const ActivityDetails = props => {
  
    const endpointId = useActivityEditorStore( state => state.endpointId )
    const activity = useActivityEditorStore( state => state.activity )

    const lastRun = activity.last_run && activity.last_run.toLowerCase() !== 'never' ? moment(activity.last_run).calendar() : undefined
    console.log('lastrun', lastRun, endpointId)
   
    function runAutomation(processConditions=true) {
        directive(endpointId, 'SceneController', 'Activate', {}, {"conditions": processConditions})
            .then(result=> { parseResult(result) })
    }
    
    function parseResult(result) {
        try {
            if (result.event.header.name==='ErrorResponse') {
                //setResultMessage(result.event.payload.message); 
                //setSeverity('error')
                //setShowResult(true); 
            }
            if (result.event.header.name==='ActivationStarted') {
                //setResultMessage('Activation started'); 
                //setSeverity('success')
                //setShowResult(true); 
            }
        }
        catch {}
    }
    

    return (    
        <Group noWrap position="apart" spacing="xl" style={{width: "100%", alignItems: "end"}} >
            <Badge>{endpointId}</Badge>
            <Text>{"Last Run:" + lastRun}</Text>
            <Group noWrap>
                <ActionIcon size="lg" onClick={() => runAutomation()}>
                    <Play size={20} />
                </ActionIcon>
                <ActionIcon size="lg" onClick={() => runAutomation(false)}>
                    <FastForward size={20} />
                </ActionIcon>
            </Group>
        </Group>
    )
};

export default ActivityDetails