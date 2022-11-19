import React, { useState } from 'react';
import useActivityEditorStore from 'activity/editor/activityEditorStore'
import { okToSave, saveActivity, addActivity } from 'activity/editor/activityEditorHelpers'
import { Affix, Button, Group, ActionIcon, Modal, Paper } from '@mantine/core';
import { directive  } from 'endpoint-model/directive/directive';
import { selectPage } from 'helpers/layoutHelpers';
import ActivityAddMenu from 'activity/editor/layout/ActivityAddMenu'
import ActivityJSON from 'activity/editor/ActivityJSON'

import { IconDeviceFloppy, IconPlayerPlay, IconPlayerTrackNext, IconPlus, IconSourceCode, IconX } from '@tabler/icons';

export default function ActivityFooter(props) {

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const endpointId = useActivityEditorStore( state => state.endpointId )
    const activity = useActivityEditorStore( state => state.activity )
    const saved = useActivityEditorStore( state => state.saved )
    const saveOk = activity && okToSave() && !saved

    function runAutomation(processConditions=true) {
        directive(endpointId, 'Alexa.SceneController', 'Activate', {}, {"conditions": processConditions})
            .then(result=> { parseResult(result) })
    }
    
    function parseResult(result) {
        try {
            if (result.event.header.name==='ActivationStarted') {
                //setResultMessage('Activation started'); 
                //setSeverity('success')
                //setShowResult(true); 
            }
        }
        catch {}
    }    

    return (
        <Affix 
            style={{ 
                boxSizing: "border-box", 
                paddingLeft: 16, 
                paddingRight: 16, 
                width: "100%", 
                display: "flex", 
                marginBottom: "env(safe-area-inset-bottom)",
                flexDirection: "row-reverse"
            }} 
            position={{ bottom: 8 }}
        >
        <Paper p={8} style={{width: "100%"}} >
            <Modal  opened={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title="Activity JSON"
                    size={"lg"}
            >
                <ActivityJSON />
            </Modal>
            <Group noWrap position='apart' style={{width: "100%"}}>
                <ActionIcon variant="light" size="md" onClick={() => selectPage('ActivitiesPage')}>
                    <IconX size={20} />
                </ActionIcon>
                <Group noWrap>
                    <ActionIcon variant="light" size="md" onClick={() => setDialogOpen(!dialogOpen)}>
                        <IconSourceCode size={20} />
                    </ActionIcon>
                    <ActivityAddMenu add={props.add} />
                    <ActionIcon variant="light" size="md" onClick={() => runAutomation()}>
                        <IconPlayerPlay size={20} />
                    </ActionIcon>
                    <ActionIcon variant="light" size="md" onClick={() => runAutomation(false)}>
                        <IconPlayerTrackNext size={20} />
                    </ActionIcon>
                </Group>
                <Button 
                    compact
                    variant = "light"
                    leftIcon= { endpointId ? <IconDeviceFloppy size={20} /> : <IconPlus size={20} /> } 
                    size="md" 
                    disabled={ !saveOk } 
                    onClick={endpointId ? saveActivity : addActivity } > 
                    Save
                </Button>
            </Group>
        </Paper>
        </Affix>
    )
}

