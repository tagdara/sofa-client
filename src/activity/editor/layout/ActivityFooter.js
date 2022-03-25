import React, { useState } from 'react';
import useActivityEditorStore from 'store/activityEditorStore'
import { okToSave, saveActivity, addActivity } from 'store/activityEditorHelpers'
import { FileEarmarkCode, LayerBackward, Save, Plus, Play, X } from 'react-bootstrap-icons'
import { Group, ActionIcon, Modal } from '@mantine/core';
import { directive  } from 'store/directive';
import { selectPage } from 'helpers/layoutHelpers';
import ActivityAddMenu from 'activity/editor/layout/ActivityAddMenu'
import ActivityJSON from 'activity/editor/ActivityJSON'

export default function ActivityFooter(props) {

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const endpointId = useActivityEditorStore( state => state.endpointId )
    const activity = useActivityEditorStore( state => state.activity )
    const saveOk = activity && okToSave()


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
        <Group noWrap>
            <Modal  opened={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title="Activity JSON"
                    size={"lg"}
            >
                <ActivityJSON />
            </Modal>

            <ActionIcon variant="light" size="md" onClick={() => selectPage('ActivitiesPage')}>
                <X size={20} />
            </ActionIcon>
            <ActionIcon variant="light" size="md" onClick={() => setDialogOpen(!dialogOpen)}>
                <FileEarmarkCode size={20} />
            </ActionIcon>
            <ActivityAddMenu add={props.add} />
            <ActionIcon variant="light" size="md" disabled={ !saveOk } onClick={endpointId ? saveActivity : addActivity } >
                { endpointId ? <Save size={20} /> : <Plus size={20} /> } 
            </ActionIcon>
            <Group noWrap position="right">
                <ActionIcon variant="light" size="md" onClick={() => runAutomation()}>
                    <Play size={20} />
                </ActionIcon>
                <ActionIcon variant="light" size="md" onClick={() => runAutomation(false)}>
                    <LayerBackward size={20} />
                </ActionIcon>
            </Group>
        </Group>
    )
}

