import React, { useState } from 'react';
import { directive  } from 'store/directive';

import Moment from 'react-moment';
import IconButton from '@mui/material/IconButton';

import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useActivityEditorStore from 'store/activityEditorStore'

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'

const ActivityDetails = props => {
  
    const endpointId = useActivityEditorStore( state => state.endpointId )
    const activity = useActivityEditorStore( state => state.activity )

    const [ showResult, setShowResult] = useState(false)
    const [ resultMessage, setResultMessage] = useState('')
    const [ severity, setSeverity] = useState('info')

    const lastRun = activity.last_run && activity.last_run !== 'never' ? activity.last_run : undefined
   
    function runAutomation(processConditions=true) {
        directive(endpointId, 'SceneController', 'Activate', {}, {"conditions": processConditions})
            .then(result=> { parseResult(result) })
    }
    
    function parseResult(result) {
        try {
            if (result.event.header.name==='ErrorResponse') {
                setResultMessage(result.event.payload.message); 
                setSeverity('error')
                setShowResult(true); 
            }
            if (result.event.header.name==='ActivationStarted') {
                setResultMessage('Activation started'); 
                setSeverity('success')
                setShowResult(true); 
            }
        }
        catch {}
    }
    
    function handleClose() {
        setShowResult(false)
    }

    return (    
        <>
        <CardLine inList={true}>
            <CardLineText secondary={ endpointId } />
        </CardLine>
        <CardLine inList={true}>
            <CardLineText primary={"Last Run"} secondary={ lastRun ? <Moment utc format="ddd MMM D h:mm:sa">{lastRun}</Moment> : 'Never'} />
            <IconButton onClick={() => runAutomation()}><PlaylistPlayIcon /></IconButton>
            <IconButton onClick={() => runAutomation(false)}><LowPriorityIcon /></IconButton>
        </CardLine>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} open={showResult} autoHideDuration={6000} onClose={handleClose}>
            <Alert elevation={6} variant="filled" severity={severity}>{resultMessage}</Alert>
        </Snackbar>
        </>
    )

};


export default ActivityDetails