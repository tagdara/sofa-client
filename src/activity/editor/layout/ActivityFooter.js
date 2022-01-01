import React from 'react';
import useActivityEditorStore from 'store/activityEditorStore'
import { saveActivity, addActivity } from 'store/activityEditorHelpers'
import { Save, Plus, Play, FastForward, X } from 'react-feather'
import { Button, Group, ActionIcon} from '@mantine/core';
import SectionHeader from 'layout/SectionHeader'
import { directive  } from 'store/directive';
import { selectPage } from 'helpers/layoutHelpers';

export default function ActivityFooter(props) {

    const saved = useActivityEditorStore( state => state.saved )
    const endpointId = useActivityEditorStore( state => state.endpointId )
    const name = useActivityEditorStore( state => state.activity.name )
    const okToSave = name && !saved

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
        <SectionHeader>
            <ActionIcon variant="light" size="md" onClick={() => selectPage('ActivitiesPage')}>
                <X size={20} />
            </ActionIcon>
            <Button size="sm" disabled={ !okToSave } 
                    leftIcon={ endpointId ? <Save size={20} /> : <Plus size={20} /> } 
                    onClick={endpointId ? saveActivity : addActivity }
            >
                { endpointId ? "Save" : "Add" }
            </Button>
            <Group noWrap position="right">
                <ActionIcon variant="light" size="md" onClick={() => runAutomation()}>
                    <Play size={20} />
                </ActionIcon>
                <ActionIcon variant="light" size="md" onClick={() => runAutomation(false)}>
                    <FastForward size={20} />
                </ActionIcon>
            </Group>
        </SectionHeader>
    )
}

